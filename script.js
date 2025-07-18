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
    }

    // Initialize character with starting stats
    setCharacter(characterType) {
        this.character = characterType;
        const startingStats = {
            parent: { hope: 70, relationships: 85, supplies: 60 },
            scientist: { hope: 50, relationships: 60, supplies: 75 },
            artist: { hope: 80, relationships: 70, supplies: 45 },
            caregiver: { hope: 75, relationships: 90, supplies: 50 },
            resistor: { hope: 60, relationships: 65, supplies: 80 }
        };
        
        this.resources = { ...startingStats[characterType] };
        this.generateEvents();
    }

    // Modify resource values with bounds checking
    modifyResource(resource, amount) {
        this.resources[resource] = Math.max(0, Math.min(100, this.resources[resource] + amount));
    }

    // Advance time
    advanceTime(weeks = 1) {
        this.week = Math.min(this.maxWeeks, this.week + weeks);
    }

    // Check if game should end
    isGameOver() {
        return this.week >= this.maxWeeks || this.currentEventIndex >= this.gameEvents.length;
    }

    // Generate events based on character and game progression
    generateEvents() {
        this.gameEvents = [];
        
        // Add character-specific events
        this.gameEvents.push(...this.getCharacterEvents());
        
        // Add universal events
        this.gameEvents.push(...this.getUniversalEvents());
        
        // Shuffle events for variety
        this.gameEvents = this.shuffleArray(this.gameEvents);
        
        // Ensure we have enough events for the full game
        while (this.gameEvents.length < 15) {
            this.gameEvents.push(...this.getRandomEvents());
        }
    }

    // Get character-specific events
    getCharacterEvents() {
        const characterEvents = {
            parent: [
                {
                    text: "Your child draws a picture of your family together, with everyone smiling. They hand it to you with pride, asking if you'll keep it forever. In the drawing, the sun is shining and there are flowers everywhere.",
                    choices: [
                        { text: "Frame it immediately and hang it where everyone can see", effects: { hope: 10, relationships: 5 } },
                        { text: "Put it safely in a memory box with other precious things", effects: { hope: 5, relationships: 8 } },
                        { text: "Thank them but set it aside - you have too much to do", effects: { hope: -5, relationships: -3 } }
                    ]
                },
                {
                    text: "Food rationing has begun in your area. Your family's allocation will be tight, but you notice your elderly neighbor hasn't been able to get to the distribution center. She sits by her window, looking frail and worried.",
                    choices: [
                        { text: "Share part of your family's ration with your neighbor", effects: { relationships: 10, supplies: -8, hope: 5 } },
                        { text: "Offer to pick up their ration when you get yours", effects: { relationships: 5, hope: 3 } },
                        { text: "Focus on your own family's needs first", effects: { supplies: 5, relationships: -5 } }
                    ]
                },
                {
                    text: "Your teenager asks if they should bother applying to college. 'What's the point?' they say, staring at the application forms. The weight of an uncertain future hangs in the air between you.",
                    choices: [
                        { text: "Encourage them to apply - hope for the future matters", effects: { hope: 8, relationships: 6, supplies: -3 } },
                        { text: "Suggest focusing on practical skills instead", effects: { hope: -2, relationships: 3, supplies: 5 } },
                        { text: "Tell them the choice is theirs to make", effects: { hope: 2, relationships: 4 } }
                    ]
                },
                {
                    text: "Your family finds an old board game while packing. Your children beg you to play 'just one more time' before you have to decide what to keep and what to leave behind.",
                    choices: [
                        { text: "Spend the evening playing games and laughing together", effects: { hope: 12, relationships: 10, supplies: -2 } },
                        { text: "Play for a little while, then get back to packing", effects: { hope: 5, relationships: 5, supplies: 2 } },
                        { text: "Insist you need to focus on practical preparations", effects: { hope: -5, relationships: -8, supplies: 8 } }
                    ]
                },
                {
                    text: "Your child has nightmares about the future and crawls into bed with you, trembling. They whisper, 'Will we be okay?' Their eyes search your face for reassurance you're not sure you can give.",
                    choices: [
                        { text: "Hold them close and promise you'll face whatever comes together", effects: { hope: 6, relationships: 12, supplies: -1 } },
                        { text: "Acknowledge their fears but focus on what you can control", effects: { hope: 3, relationships: 6, supplies: 2 } },
                        { text: "Try to distract them with practical preparations", effects: { hope: -3, relationships: -2, supplies: 5 } }
                    ]
                }
            ],
            scientist: [
                {
                    text: "Your research data shows the collapse is accelerating faster than public reports indicate. Colleagues ask if you'll help them prepare a more honest assessment for the community. The truth is terrifying, but people deserve to know.",
                    choices: [
                        { text: "Help create an honest but hopeful report", effects: { hope: -5, relationships: 8, supplies: 3 } },
                        { text: "Refuse - people aren't ready for the full truth", effects: { hope: 5, relationships: -5, supplies: 5 } },
                        { text: "Share the data but let others decide what to do", effects: { relationships: 3, supplies: 2 } }
                    ]
                },
                {
                    text: "A group of survivors asks you to help design a water purification system for their community. It would take weeks of your time and most of your equipment, but could save dozens of lives.",
                    choices: [
                        { text: "Dedicate yourself fully to helping them", effects: { hope: 8, relationships: 12, supplies: -15 } },
                        { text: "Provide the plans but keep your equipment", effects: { hope: 3, relationships: 5, supplies: -5 } },
                        { text: "Politely decline - you need your resources", effects: { hope: -3, supplies: 8 } }
                    ]
                },
                {
                    text: "You discover a potential solution that might slow the collapse, but it would require convincing world leaders to act immediately. The chances of success seem impossibly small.",
                    choices: [
                        { text: "Dedicate everything to trying to save the world", effects: { hope: 15, relationships: -5, supplies: -10 } },
                        { text: "Share the research but focus on local solutions", effects: { hope: 5, relationships: 5, supplies: 3 } },
                        { text: "Keep the research private - it's too late anyway", effects: { hope: -8, relationships: -3, supplies: 8 } }
                    ]
                },
                {
                    text: "A former student contacts you, desperate for guidance. They're leading a small community and need to know how much time they have to prepare. You could give them false hope or crushing truth.",
                    choices: [
                        { text: "Give them the unvarnished truth and help them prepare", effects: { hope: -3, relationships: 8, supplies: -2 } },
                        { text: "Provide cautious estimates with room for hope", effects: { hope: 5, relationships: 5, supplies: 1 } },
                        { text: "Encourage them to focus on immediate needs only", effects: { hope: 2, relationships: 2, supplies: 5 } }
                    ]
                },
                {
                    text: "Your laboratory is being shut down. You have one last chance to preserve your life's work - either in digital archives that might survive, or by teaching everything to a small group of apprentices.",
                    choices: [
                        { text: "Focus on digital preservation for the future", effects: { hope: 8, relationships: 2, supplies: 3 } },
                        { text: "Teach everything to apprentices who can carry it forward", effects: { hope: 6, relationships: 10, supplies: -3 } },
                        { text: "Try to do both, even if neither is perfect", effects: { hope: 4, relationships: 6, supplies: 0 } }
                    ]
                }
            ],
            artist: [
                {
                    text: "You've been documenting the changing world through your art. A local museum offers to preserve your work, but they want you to focus on 'uplifting' pieces rather than the darker realities you've been capturing.",
                    choices: [
                        { text: "Accept and create hopeful art for future generations", effects: { hope: 10, relationships: 5, supplies: 3 } },
                        { text: "Decline and continue documenting the truth", effects: { hope: -3, relationships: -2, supplies: -2 } },
                        { text: "Compromise - create both types of work", effects: { hope: 2, relationships: 2, supplies: 1 } }
                    ]
                },
                {
                    text: "Children in your neighborhood ask you to teach them to paint. Their parents hope art might help them process what's happening to the world. You see the fear and confusion in their young eyes.",
                    choices: [
                        { text: "Start regular art classes for the children", effects: { hope: 12, relationships: 10, supplies: -5 } },
                        { text: "Teach them occasionally when you have time", effects: { hope: 5, relationships: 5 } },
                        { text: "Suggest they find someone else - you're too busy", effects: { hope: -5, relationships: -8 } }
                    ]
                },
                {
                    text: "You find the perfect spot to create your masterpiece - a mural that captures both the beauty and tragedy of this final year. But the wall belongs to a building scheduled for demolition.",
                    choices: [
                        { text: "Paint the mural anyway - art transcends ownership", effects: { hope: 10, relationships: -2, supplies: -5 } },
                        { text: "Ask permission and risk being told no", effects: { hope: 3, relationships: 5, supplies: -2 } },
                        { text: "Find a different, safer location", effects: { hope: 1, relationships: 2, supplies: 2 } }
                    ]
                },
                {
                    text: "A wealthy collector offers to buy all your recent work for enough money to secure your family's survival. But they plan to hide the art in a private vault where no one will see it.",
                    choices: [
                        { text: "Sell the work to protect your family", effects: { hope: -5, relationships: 5, supplies: 15 } },
                        { text: "Refuse and find other ways to survive", effects: { hope: 8, relationships: 2, supplies: -8 } },
                        { text: "Negotiate to keep some pieces public", effects: { hope: 3, relationships: 3, supplies: 8 } }
                    ]
                },
                {
                    text: "You discover a cache of art supplies in an abandoned studio. There's enough to last months, but taking them feels like grave robbing. A note suggests the artist hoped someone would continue their work.",
                    choices: [
                        { text: "Take the supplies and honor their artistic legacy", effects: { hope: 8, relationships: 3, supplies: 10 } },
                        { text: "Take only what you need and leave the rest", effects: { hope: 5, relationships: 5, supplies: 5 } },
                        { text: "Leave everything untouched out of respect", effects: { hope: 2, relationships: 8, supplies: -2 } }
                    ]
                }
            ],
            caregiver: [
                {
                    text: "The local shelter is overwhelmed with people who have nowhere else to go. They desperately need volunteers, but you're already stretched thin caring for others. Your own health is beginning to suffer.",
                    choices: [
                        { text: "Volunteer despite your exhaustion", effects: { hope: 5, relationships: 15, supplies: -10 } },
                        { text: "Help organize other volunteers instead", effects: { hope: 3, relationships: 8, supplies: -3 } },
                        { text: "Focus on the people you're already helping", effects: { hope: -2, relationships: 3, supplies: 2 } }
                    ]
                },
                {
                    text: "An elderly person you care for asks you to help them write letters to family members they haven't spoken to in years. They want to make peace before it's too late. Their hands shake as they try to hold the pen.",
                    choices: [
                        { text: "Spend the day helping them write heartfelt letters", effects: { hope: 8, relationships: 12, supplies: -2 } },
                        { text: "Help them make phone calls instead - it's faster", effects: { hope: 5, relationships: 8 } },
                        { text: "Suggest they focus on the family who are still close", effects: { hope: -3, relationships: -5, supplies: 3 } }
                    ]
                },
                {
                    text: "A family with young children has been evicted and has nowhere to go. Your own space is small, but you could make room. The children look scared and hungry.",
                    choices: [
                        { text: "Invite them to stay as long as needed", effects: { hope: 6, relationships: 15, supplies: -12 } },
                        { text: "Let them stay for a few days while they find alternatives", effects: { hope: 4, relationships: 8, supplies: -5 } },
                        { text: "Help them find other resources but can't house them", effects: { hope: -2, relationships: 3, supplies: 2 } }
                    ]
                },
                {
                    text: "Someone you've been caring for is dying. They ask you to stay with them in their final hours rather than attending to your other responsibilities. They don't want to be alone.",
                    choices: [
                        { text: "Stay with them until the end", effects: { hope: 5, relationships: 12, supplies: -5 } },
                        { text: "Arrange for family to be with them instead", effects: { hope: 2, relationships: 5, supplies: 2 } },
                        { text: "Visit when you can but maintain your other duties", effects: { hope: -3, relationships: -2, supplies: 5 } }
                    ]
                },
                {
                    text: "Medical supplies are running dangerously low. You could hoard what you have for the people you're already caring for, or distribute them more widely to help more people for a shorter time.",
                    choices: [
                        { text: "Distribute supplies to help as many as possible", effects: { hope: 8, relationships: 12, supplies: -8 } },
                        { text: "Keep supplies for your current patients", effects: { hope: -2, relationships: 5, supplies: 5 } },
                        { text: "Try to find more supplies before deciding", effects: { hope: 3, relationships: 3, supplies: 0 } }
                    ]
                }
            ],
            resistor: [
                {
                    text: "Your resistance group has discovered a cache of supplies hoarded by wealthy elites while people starve. You could redistribute them to those in need, but it would be risky and definitely illegal.",
                    choices: [
                        { text: "Lead the mission to redistribute the supplies", effects: { hope: 10, relationships: 8, supplies: 15 } },
                        { text: "Report the location to community leaders instead", effects: { hope: 3, relationships: 5, supplies: 5 } },
                        { text: "Leave it alone - the risk is too great", effects: { hope: -8, relationships: -5, supplies: 3 } }
                    ]
                },
                {
                    text: "Government forces are cracking down on resistance activities. Some of your group want to go underground, others want to fight back openly. The community looks to you for leadership.",
                    choices: [
                        { text: "Advocate for going underground to survive", effects: { hope: -5, relationships: 5, supplies: 8 } },
                        { text: "Support open resistance despite the risks", effects: { hope: 8, relationships: 10, supplies: -10 } },
                        { text: "Suggest the group split up for safety", effects: { hope: -3, relationships: -8, supplies: 5 } }
                    ]
                },
                {
                    text: "You've intercepted communications showing a planned raid on a refugee camp. You could warn them, but it would expose your intelligence network and put your group at risk.",
                    choices: [
                        { text: "Warn the camp immediately, regardless of the cost", effects: { hope: 10, relationships: 12, supplies: -8 } },
                        { text: "Find an anonymous way to tip them off", effects: { hope: 5, relationships: 6, supplies: -3 } },
                        { text: "Protect your network - you can't save everyone", effects: { hope: -8, relationships: -5, supplies: 5 } }
                    ]
                },
                {
                    text: "A former government official wants to defect and join your cause. They have valuable information but their presence would make your group a high-priority target.",
                    choices: [
                        { text: "Welcome them and use their knowledge", effects: { hope: 8, relationships: 5, supplies: -5 } },
                        { text: "Accept their information but keep them at distance", effects: { hope: 3, relationships: 2, supplies: 3 } },
                        { text: "Refuse - it's too dangerous", effects: { hope: -3, relationships: -3, supplies: 8 } }
                    ]
                },
                {
                    text: "Your resistance cell has the opportunity to sabotage infrastructure that's being used to oppress people, but the same infrastructure provides essential services to innocent families.",
                    choices: [
                        { text: "Proceed with sabotage - the greater good demands it", effects: { hope: 5, relationships: -5, supplies: 8 } },
                        { text: "Find a way to target only the oppressive elements", effects: { hope: 8, relationships: 5, supplies: -5 } },
                        { text: "Abandon the mission to protect innocent people", effects: { hope: -5, relationships: 8, supplies: -3 } }
                    ]
                }
            ]
        };
        
        return characterEvents[this.character] || [];
    }

    // Get universal events that apply to all characters
    getUniversalEvents() {
        return [
            {
                text: "Power outages are becoming more frequent. Your neighborhood is organizing to share resources and look out for each other during blackouts. The sense of community is stronger than it's been in years.",
                choices: [
                    { text: "Volunteer to coordinate the neighborhood response", effects: { hope: 5, relationships: 10, supplies: -3 } },
                    { text: "Contribute supplies but let others organize", effects: { relationships: 5, supplies: -5, hope: 2 } },
                    { text: "Keep your resources for your own household", effects: { supplies: 5, relationships: -5, hope: -3 } }
                ]
            },
            {
                text: "You find an old photo album while cleaning. The pictures show happier times - family gatherings, celebrations, ordinary moments that now seem precious beyond measure. Each image tells a story of a world that feels impossibly distant.",
                choices: [
                    { text: "Spend the evening looking through every photo and remembering", effects: { hope: 8, relationships: 5 } },
                    { text: "Share the photos with family and friends", effects: { hope: 5, relationships: 10 } },
                    { text: "Put it away - it's too painful to look at now", effects: { hope: -5, supplies: 2 } }
                ]
            },
            {
                text: "A stranger approaches you, clearly struggling and asking for help. They look desperate, their clothes worn and eyes hollow with exhaustion. You don't know if you can trust them, but their need seems genuine.",
                choices: [
                    { text: "Offer what help you can", effects: { hope: 5, relationships: 8, supplies: -5 } },
                    { text: "Direct them to community resources", effects: { hope: 2, relationships: 3 } },
                    { text: "Politely decline and walk away", effects: { hope: -3, supplies: 3 } }
                ]
            },
            {
                text: "You hear music coming from a nearby house - someone is playing piano. In the midst of everything falling apart, the melody is hauntingly beautiful, a reminder that art and beauty persist even in darkness.",
                choices: [
                    { text: "Stop and listen, letting the music wash over you", effects: { hope: 10, relationships: 2 } },
                    { text: "Knock on the door to thank the musician", effects: { hope: 5, relationships: 8 } },
                    { text: "Continue on your way - you have things to do", effects: { supplies: 3, hope: -2 } }
                ]
            },
            {
                text: "The local library is giving away books before closing permanently. Decades of knowledge and stories are being dispersed. You can take as many as you want, but carrying them will slow you down.",
                choices: [
                    { text: "Take armfuls of books to preserve knowledge", effects: { hope: 8, supplies: -3, relationships: 3 } },
                    { text: "Take just a few meaningful books", effects: { hope: 5, supplies: 1 } },
                    { text: "Leave them for others who need them more", effects: { relationships: 5, hope: 3 } }
                ]
            },
            {
                text: "You witness a random act of kindness - someone giving their last sandwich to a hungry child they don't know. In a world growing darker, this small light shines brightly.",
                choices: [
                    { text: "Approach and offer to help them both", effects: { hope: 8, relationships: 10, supplies: -3 } },
                    { text: "Quietly add your own contribution", effects: { hope: 5, relationships: 5, supplies: -5 } },
                    { text: "Smile and continue on, warmed by what you saw", effects: { hope: 6, relationships: 2 } }
                ]
            },
            {
                text: "A community garden has been vandalized, plants destroyed and tools stolen. The gardeners stand among the wreckage, some crying, others already planning to rebuild.",
                choices: [
                    { text: "Volunteer to help rebuild immediately", effects: { hope: 8, relationships: 12, supplies: -5 } },
                    { text: "Donate what supplies you can spare", effects: { hope: 3, relationships: 6, supplies: -8 } },
                    { text: "Express sympathy but you can't afford to help", effects: { hope: -2, relationships: -3, supplies: 3 } }
                ]
            },
            {
                text: "You discover a time capsule buried by children years ago, full of drawings and letters to the future. Their innocent hopes and dreams feel both heartbreaking and inspiring.",
                choices: [
                    { text: "Try to find the children and return it to them", effects: { hope: 10, relationships: 8, supplies: -2 } },
                    { text: "Add your own message and rebury it", effects: { hope: 6, relationships: 3, supplies: 1 } },
                    { text: "Keep it as a reminder of better times", effects: { hope: 4, relationships: 1, supplies: 2 } }
                ]
            },
            {
                text: "An elderly couple sits on their porch, holding hands and watching the sunset. Despite everything happening, they seem at peace. They wave at you as you pass.",
                choices: [
                    { text: "Stop and chat with them about their long life together", effects: { hope: 8, relationships: 6, supplies: -1 } },
                    { text: "Wave back and continue, but feel uplifted", effects: { hope: 5, relationships: 2 } },
                    { text: "Hurry past - you don't have time for pleasantries", effects: { hope: -2, supplies: 3 } }
                ]
            },
            {
                text: "You find a message written in chalk on a sidewalk: 'Hope is the thing with feathers.' Someone took the time to share poetry in the midst of chaos.",
                choices: [
                    { text: "Add your own hopeful message nearby", effects: { hope: 8, relationships: 5, supplies: -1 } },
                    { text: "Take a photo to remember it", effects: { hope: 5, relationships: 2 } },
                    { text: "Appreciate it silently and move on", effects: { hope: 3, relationships: 1 } }
                ]
            },
            {
                text: "A group of teenagers has organized a free concert in the park, playing acoustic guitars and singing. Their music draws a small crowd of all ages, creating a moment of unity.",
                choices: [
                    { text: "Join the crowd and sing along", effects: { hope: 10, relationships: 8, supplies: -1 } },
                    { text: "Listen from a distance but enjoy the music", effects: { hope: 6, relationships: 3 } },
                    { text: "Appreciate the gesture but keep moving", effects: { hope: 2, supplies: 2 } }
                ]
            },
            {
                text: "You overhear a parent reading a bedtime story to their child, their voice steady and comforting despite the uncertainty outside. The child asks if the story will have a happy ending.",
                choices: [
                    { text: "Quietly leave a small gift for the child", effects: { hope: 6, relationships: 8, supplies: -3 } },
                    { text: "Smile and continue on, touched by the scene", effects: { hope: 5, relationships: 3 } },
                    { text: "Feel sad about the child's uncertain future", effects: { hope: -3, relationships: 2, supplies: 1 } }
                ]
            }
        ];
    }

    // Get additional random events for variety
    getRandomEvents() {
        return [
            {
                text: "You discover a small garden growing wild in an abandoned lot. Someone must have planted it before leaving.",
                choices: [
                    { text: "Tend the garden and share the harvest", effects: { hope: 6, relationships: 6, supplies: 8 } },
                    { text: "Take what you need and leave the rest", effects: { supplies: 5, hope: 2 } },
                    { text: "Leave it untouched for whoever planted it", effects: { hope: 4, relationships: 4 } }
                ]
            },
            {
                text: "A child asks you what the world was like 'before.' You realize they may never see the world you remember.",
                choices: [
                    { text: "Tell them stories of beauty and wonder", effects: { hope: 8, relationships: 6 } },
                    { text: "Focus on the lessons they'll need for the future", effects: { hope: 3, relationships: 4, supplies: 2 } },
                    { text: "Admit you don't know how to explain it", effects: { hope: -2, relationships: 2 } }
                ]
            }
        ];
    }

    // Utility function to shuffle array
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    // Get current event
    getCurrentEvent() {
        if (this.currentEventIndex < this.gameEvents.length) {
            return this.gameEvents[this.currentEventIndex];
        }
        return null;
    }

    // Process choice and advance game
    makeChoice(choiceIndex) {
        const currentEvent = this.getCurrentEvent();
        if (currentEvent && currentEvent.choices[choiceIndex]) {
            const choice = currentEvent.choices[choiceIndex];
            
            // Apply effects
            Object.keys(choice.effects).forEach(resource => {
                this.modifyResource(resource, choice.effects[resource]);
            });
            
            // Record choice in history
            this.eventHistory.push({
                event: currentEvent,
                choice: choice,
                week: this.week
            });
            
            // Advance game
            this.currentEventIndex++;
            this.advanceTime(Math.floor(Math.random() * 3) + 1); // Advance 1-3 weeks
        }
    }
}

// Game UI Controller
class GameUI {
    constructor() {
        this.gameState = new GameState();
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Title screen
        document.getElementById('start-btn').addEventListener('click', () => {
            this.showScreen('character-screen');
        });

        // Character selection
        document.querySelectorAll('.character-card').forEach(card => {
            card.addEventListener('click', () => {
                const character = card.dataset.character;
                this.gameState.setCharacter(character);
                this.showScreen('game-screen');
                this.updateUI();
                this.showNextEvent();
            });
        });

        // Restart button
        document.getElementById('restart-btn').addEventListener('click', () => {
            this.gameState = new GameState();
            this.showScreen('title-screen');
        });

        // Continue button
        document.getElementById('continue-btn').addEventListener('click', () => {
            this.showNextEvent();
        });
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    updateUI() {
        // Update resource bars
        this.updateResourceBar('hope', this.gameState.resources.hope);
        this.updateResourceBar('relationships', this.gameState.resources.relationships);
        this.updateResourceBar('supplies', this.gameState.resources.supplies);
        
        // Update time
        document.getElementById('time-value').textContent = `Week ${this.gameState.week} of ${this.gameState.maxWeeks}`;
    }

    updateResourceBar(resource, value) {
        const bar = document.getElementById(`${resource}-bar`);
        const valueDisplay = document.getElementById(`${resource}-value`);
        
        bar.style.width = `${value}%`;
        valueDisplay.textContent = `${value}/100`;
        
        // Add visual feedback for low resources
        if (value < 30) {
            bar.style.filter = 'brightness(0.7)';
        } else {
            bar.style.filter = 'brightness(1)';
        }
    }

    showNextEvent() {
        if (this.gameState.isGameOver()) {
            this.showEnding();
            return;
        }

        const event = this.gameState.getCurrentEvent();
        if (!event) {
            this.showEnding();
            return;
        }

        // Display event text
        const eventTextElement = document.getElementById('event-text');
        eventTextElement.textContent = event.text;

        // Create choice buttons
        const choicesContainer = document.getElementById('choices-container');
        choicesContainer.innerHTML = '';

        event.choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.className = 'choice-btn';
            button.textContent = choice.text;
            button.addEventListener('click', () => {
                this.makeChoice(index);
            });
            choicesContainer.appendChild(button);
        });

        // Hide continue button, show choices
        document.getElementById('continue-container').style.display = 'none';
        choicesContainer.style.display = 'flex';
    }

    makeChoice(choiceIndex) {
        this.gameState.makeChoice(choiceIndex);
        this.updateUI();
        
        // Show resource change feedback
        this.showResourceChanges();
        
        // Hide choices, show continue button
        document.getElementById('choices-container').style.display = 'none';
        document.getElementById('continue-container').style.display = 'block';
    }

    showResourceChanges() {
        // This could be enhanced with animated feedback showing resource changes
        // For now, the progress bars will animate the changes
    }

    showEnding() {
        const { hope, relationships, supplies } = this.gameState.resources;
        const character = this.gameState.character;
        
        let endingText = this.generateEndingText(hope, relationships, supplies, character);
        
        document.getElementById('ending-text').textContent = endingText;
        
        // Show final stats
        const finalStats = document.getElementById('final-stats');
        finalStats.innerHTML = `
            <div class="final-stat">
                <label>Hope</label>
                <value style="color: ${hope > 60 ? '#27ae60' : hope > 30 ? '#f39c12' : '#e74c3c'}">${hope}/100</value>
            </div>
            <div class="final-stat">
                <label>Relationships</label>
                <value style="color: ${relationships > 60 ? '#27ae60' : relationships > 30 ? '#f39c12' : '#e74c3c'}">${relationships}/100</value>
            </div>
            <div class="final-stat">
                <label>Supplies</label>
                <value style="color: ${supplies > 60 ? '#27ae60' : supplies > 30 ? '#f39c12' : '#e74c3c'}">${supplies}/100</value>
            </div>
        `;
        
        this.showScreen('ending-screen');
    }

    generateEndingText(hope, relationships, supplies, character) {
        const totalScore = hope + relationships + supplies;
        
        let baseEnding = "";
        let characterEnding = "";
        
        // Base ending based on overall performance
        if (totalScore > 200) {
            baseEnding = "As the final days arrived, you found yourself surrounded by the connections you had nurtured and the hope you had maintained. Though the world was ending, you had created something beautiful in its final moments.";
        } else if (totalScore > 150) {
            baseEnding = "The end came as predicted, but you faced it with dignity. Your choices had meaning, and the relationships you built provided comfort in the darkness.";
        } else if (totalScore > 100) {
            baseEnding = "You survived the final year, though not without cost. Some choices weighed heavily on you, but you persevered through the collapse with what strength you could muster.";
        } else {
            baseEnding = "The final year was harsh, and you struggled to maintain hope as everything fell apart. Yet even in the darkest moments, you endured.";
        }
        
        // Character-specific endings
        const characterEndings = {
            parent: relationships > 70 ? " Your children will remember not just that you were there, but how you chose love over fear in the face of the end." : " You did your best to protect your family, even when the choices were impossible.",
            scientist: hope > 60 ? " Your knowledge became a gift to others, helping them understand and prepare for what was coming." : " The burden of knowledge was heavy, but you carried it as best you could.",
            artist: hope > 70 ? " Your art captured the beauty that persisted even as the world ended, leaving a legacy of wonder for whoever might find it." : " Through your art, you documented the end of an era, preserving truth in beauty.",
            caregiver: relationships > 80 ? " The lives you touched were made brighter by your presence, and your compassion echoed through the community." : " You gave of yourself until the end, caring for others even when resources were scarce.",
            resistor: supplies > 60 ? " Your resistance efforts helped others survive and maintain dignity in the face of collapse." : " You fought against the dying of the light, even when victory seemed impossible."
        };
        
        characterEnding = characterEndings[character] || "";
        
        return baseEnding + characterEnding;
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new GameUI();
});

