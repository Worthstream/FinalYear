// Game State Management
class GameState {
    constructor() {
        this.character = null;
        this.resources = {
            hope: 70,
            relationships: 70,
            supplies: 70
        };
        this.week = 1;
        this.maxWeeks = 52;
        this.eventHistory = [];
        this.currentEventIndex = 0;
        this.gameEvents = [];
        this.usedEventIds = new Set(); // Track used events with once: true
        this.gameFlags = new Set(); // Track game flags for event requirements
        this.momentum = []; // Track recent Hope changes for momentum calculation
    }

    // Initialize character with starting stats
    setCharacter(characterType) {
        this.character = characterType;
        this.resources = { ...STORY_DATA.startingStats[characterType] };
        this.generateEvents();
    }

    // Modify resource values with bounds checking
    modifyResource(resource, amount) {
        // Apply momentum modifier for Hope changes
        if (resource === 'hope' && amount !== 0) {
            const momentumModifier = this.getMomentumModifier();
            amount += momentumModifier;
            
            // Track Hope changes for momentum calculation
            this.momentum.push(amount);
            if (this.momentum.length > 5) {
                this.momentum.shift(); // Keep only last 5 changes
            }
        }
        
        this.resources[resource] = Math.max(0, Math.min(120, this.resources[resource] + amount));
        
        // Check for resource collapse state
        if (this.resources.supplies <= 0) {
            this.supplyCollapseState = true;
        }
    }

    // Calculate momentum modifier based on recent Hope changes
    getMomentumModifier() {
        if (this.momentum.length < 3) return 0;
        
        const recentAverage = this.momentum.slice(-3).reduce((sum, val) => sum + val, 0) / 3;
        
        if (recentAverage > 3) return 1; // Optimistic momentum
        if (recentAverage < -3) return -1; // Pessimistic momentum
        return 0;
    }

    // Get relationship tier
    getRelationshipTier() {
        const rel = this.resources.relationships;
        if (rel <= 25) return "estranged";
        if (rel <= 50) return "acquaintances";
        if (rel <= 75) return "trusted";
        return "beloved";
    }

    // Advance time
    advanceTime(weeks = 1) {
        this.week = Math.min(this.maxWeeks, this.week + weeks);
    }

    // Check if game should end
    isGameOver() {
        // Game ends if we reach week 52 (the final week)
        if (this.week >= this.maxWeeks) {
            return true;
        }
        
        // Game ends if any resource reaches 0
        if (this.resources.hope <= 0 || this.resources.relationships <= 0 || this.resources.supplies <= 0) {
            return true;
        }
        
        return false;
    }

    // Get current game phase based on week
    getCurrentPhase() {
        if (this.week <= 17) return "early";
        if (this.week <= 35) return "mid";
        return "late";
    }

    // Check if event requirements are met
    canTriggerEvent(event) {
        // Check phase requirement
        if (event.phase && event.phase !== this.getCurrentPhase()) {
            return false;
        }
        
        // Check if event was already used and is marked as once
        if (event.once && this.usedEventIds.has(event.id)) {
            return false;
        }
        
        // Check required flags
        if (event.flags.requires) {
            for (const flag of event.flags.requires) {
                if (!this.gameFlags.has(flag)) {
                    return false;
                }
            }
        }
        
        // Check blocked flags
        if (event.flags.blocks) {
            for (const flag of event.flags.blocks) {
                if (this.gameFlags.has(flag)) {
                    return false;
                }
            }
        }
        
        // Check relationship tier requirements (if any)
        const relationshipTier = this.getRelationshipTier();
        if (event.requiresRelationshipTier && event.requiresRelationshipTier !== relationshipTier) {
            return false;
        }
        
        return true;
    }

    // Generate weighted event pool
    generateEvents() {
        const characterEvents = STORY_DATA.characterEvents[this.character] || [];
        const universalEvents = STORY_DATA.universalEvents || [];
        const randomEvents = STORY_DATA.randomEvents || [];
        
        // Combine all events
        const allEvents = [...characterEvents, ...universalEvents, ...randomEvents];
        
        // Filter events that can be triggered
        const availableEvents = allEvents.filter(event => this.canTriggerEvent(event));
        
        // Create weighted pool
        const weightedPool = [];
        availableEvents.forEach(event => {
            const weight = event.weight || 1;
            for (let i = 0; i < weight; i++) {
                weightedPool.push(event);
            }
        });
        
        // Shuffle the pool
        for (let i = weightedPool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [weightedPool[i], weightedPool[j]] = [weightedPool[j], weightedPool[i]];
        }
        
        this.gameEvents = weightedPool;
    }

    // Get current event
    getCurrentEvent() {
        if (this.currentEventIndex >= this.gameEvents.length) {
            // Regenerate events if we've run out
            this.generateEvents();
            this.currentEventIndex = 0;
        }
        
        return this.gameEvents[this.currentEventIndex];
    }

    // Make a choice and apply effects
    makeChoice(choiceIndex) {
        const currentEvent = this.getCurrentEvent();
        const choice = currentEvent.choices[choiceIndex];
        
        if (!choice) return;

        // Store the choice for immediate feedback
        this.lastChoice = choice;
        
        // Apply resource effects with visual feedback
        const effects = choice.effects || {};
        const resourceChanges = {};
        
        Object.keys(effects).forEach(resource => {
            const change = effects[resource];
            if (change !== 0) {
                const oldValue = this.resources[resource];
                this.modifyResource(resource, change);
                const newValue = this.resources[resource];
                resourceChanges[resource] = {
                    change: newValue - oldValue,
                    oldValue,
                    newValue
                };
                
                // Show floating feedback
                this.showResourceChange(resource, newValue - oldValue);
            }
        });

        // Mark event as used if it's a once-only event
        if (currentEvent.once) {
            this.usedEventIds.add(currentEvent.id);
        }

        // Add to event history
        this.eventHistory.push({
            week: this.week,
            event: currentEvent.text,
            choice: choice.text,
            effects: resourceChanges
        });

        // Update display immediately
        this.updateDisplay();
        
        const choiceButtons = document.querySelectorAll('.choice-btn');
        choiceButtons.forEach((button, index) => {
            if (index !== choiceIndex) {
                button.classList.add('fade-out');
            }
        });

        // Go to next event after a brief delay
        setTimeout(() => {
            this.nextEvent();
        }, 2000);
    }

    // Show floating resource change feedback
    showResourceChange(resource, change) {
        const resourceElement = document.querySelector(`[data-resource="${resource}"]`);
        if (!resourceElement) return;
        
        const feedback = document.createElement('div');
        feedback.className = 'resource-feedback';
        feedback.textContent = change > 0 ? `+${change}` : `${change}`;
        feedback.style.color = change > 0 ? '#2ecc71' : '#e74c3c';
        
        resourceElement.appendChild(feedback);
        
        // Remove after animation
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 2000);
    }

    // Advance to next event
    nextEvent() {
        this.advanceTime(Math.floor(Math.random() * 3) + 1); // Advance 1-3 weeks
        this.currentEventIndex++;
        
        if (this.isGameOver()) {
            this.showEnding();
        } else {
            // Regenerate events to account for new phase/conditions
            this.generateEvents();
            this.showCurrentEvent();
        }
        document.getElementById('action-result').style.display = 'none';
    }

    // Display current event
    showCurrentEvent() {
        const currentEvent = this.getCurrentEvent();
        if (!currentEvent) {
            this.showEnding();
            return;
        }

        document.getElementById('event-text').textContent = currentEvent.text;
        
        const choicesContainer = document.getElementById('choices-container');
        choicesContainer.innerHTML = '';
        
        currentEvent.choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.className = 'choice-btn';
            button.textContent = choice.text;
            button.onclick = () => this.makeChoice(index);
            choicesContainer.appendChild(button);
        });

        this.updateDisplay();
    }

    // Update resource display
    updateDisplay() {
        // Update resource bars and values
        Object.keys(this.resources).forEach(resource => {
            const value = this.resources[resource];
            const bar = document.querySelector(`#${resource}-bar`);
            const text = document.querySelector(`#${resource}-value`);
            
            if (bar) {
                bar.style.width = `${Math.max(0, Math.min(100, (value / 120) * 100))}%`;
                
                // Update bar color based on value
                if (value <= 20) {
                    bar.style.backgroundColor = '#e74c3c';
                } else if (value <= 40) {
                    bar.style.backgroundColor = '#f39c12';
                } else {
                    bar.style.backgroundColor = '#2ecc71';
                }
            }
            
            if (text) {
                text.textContent = `${value}/120`;
            }
        });

        // Update week display
        const weekElement = document.getElementById('time-value');
        if (weekElement) {
            weekElement.textContent = `Week ${this.week} of ${this.maxWeeks}`;
        }

        // Update momentum display (if element exists)
        const momentumElement = document.getElementById('momentum-text');
        if (momentumElement) {
            const modifier = this.getMomentumModifier();
            const tier = this.getRelationshipTier();
            momentumElement.textContent = `Momentum: ${modifier > 0 ? '+' : ''}${modifier} | Relationships: ${tier}`;
        }
    }

    // Show game ending
    showEnding() {
        const endingReason = this.getEndingReason();
        const endingText = this.generateEndingText(endingReason);
        
        document.getElementById('event-text').innerHTML = `
            <h2>The Final Year - Complete</h2>
            <p><strong>Ending:</strong> ${endingReason}</p>
            <p>${endingText}</p>
            <div class="final-stats">
                <h3>Final Statistics</h3>
                <p>Hope: ${this.resources.hope}/120</p>
                <p>Relationships: ${this.resources.relationships}/120</p>
                <p>Supplies: ${this.resources.supplies}/120</p>
                <p>Weeks Survived: ${this.week}/${this.maxWeeks}</p>
                <p>Relationship Tier: ${this.getRelationshipTier()}</p>
            </div>
        `;
        
        document.getElementById('choices').innerHTML = '<button onclick="location.reload()" class="choice-btn">Play Again</button>';
    }

    // Determine ending reason
    getEndingReason() {
        if (this.week >= this.maxWeeks) {
            return "Survived the Final Year";
        }
        if (this.resources.hope <= 0) {
            return "Lost to Despair";
        }
        if (this.resources.relationships <= 0) {
            return "Died Alone";
        }
        if (this.resources.supplies <= 0) {
            return "Resource Collapse";
        }
        return "Unknown Ending";
    }

    // Generate ending text based on character and final state
    generateEndingText(reason) {
        const character = this.character;
        const hope = this.resources.hope;
        const relationships = this.resources.relationships;
        const supplies = this.resources.supplies;
        
        if (reason === "Survived the Final Year") {
            if (hope >= 80 && relationships >= 80) {
                return `As ${character}, you not only survived the final year but thrived. Your community looks to you as a beacon of hope, and together you face whatever comes next with courage and unity.`;
            } else if (hope >= 60 || relationships >= 60) {
                return `You made it through the final year as ${character}. Though the world has changed forever, you've found ways to adapt and maintain what matters most to you.`;
            } else {
                return `You survived the final year as ${character}, but at great cost. The world is darker now, and you carry the weight of difficult choices, but you endure.`;
            }
        } else if (reason === "Lost to Despair") {
            return `The weight of the collapsing world became too much to bear. As ${character}, you fought valiantly, but hope finally slipped away in week ${this.week}.`;
        } else if (reason === "Died Alone") {
            return `In trying to survive, you lost connection with those who mattered most. As ${character}, you faced the end in isolation in week ${this.week}.`;
        } else if (reason === "Resource Collapse") {
            return `Despite your best efforts as ${character}, the practical necessities of survival overwhelmed you in week ${this.week}. Sometimes good intentions aren't enough.`;
        }
        
        return `Your journey as ${character} ended in week ${this.week}. Every choice mattered, every moment had weight.`;
    }
}

// Game instance
let game = new GameState();

// Character selection
function selectCharacter(character) {
    game.setCharacter(character);
    
    document.getElementById('character-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    
    game.showCurrentEvent();
}

// Start game
function startGame() {
    document.getElementById('title-screen').style.display = 'none';
    document.getElementById('character-screen').style.display = 'block';
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Show start screen
    document.getElementById('title-screen').style.display = 'block';
    document.getElementById('character-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'none';
    
    // Add event listener to start button
    document.getElementById('start-btn').addEventListener('click', startGame);
    
    // Add event listeners to character cards
    document.querySelectorAll('.character-card').forEach(card => {
        card.addEventListener('click', function() {
            const character = this.getAttribute('data-character');
            selectCharacter(character);
        });
    });
});

