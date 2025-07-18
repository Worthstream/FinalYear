# The Final Year - Game Design Document

## Core Game Mechanics

### Resource System
- **Hope**: Represents the character's emotional resilience and optimism (0-100)
- **Relationships**: Strength of connections with family, friends, and community (0-100)
- **Supplies**: Physical resources like food, medicine, tools (0-100)
- **Time**: Countdown from 52 weeks to 0 (the final year)

### Character Backgrounds
1. **Parent**: Focus on family decisions, protecting children
2. **Scientist**: Access to information about the collapse, technical solutions
3. **Artist**: Creating legacy through art, documenting the end times
4. **Caregiver**: Helping others, community service focus
5. **Resistor**: Fighting against the collapse, organizing resistance

### Choice Impact System
- Each choice affects 1-3 resources by +/-5 to +/-15 points
- Some choices have delayed consequences (affect future events)
- Major decisions can have larger impacts (+/-20 to +/-30)
- Character background unlocks unique events and choices

### Event Types
1. **Daily Life Events**: Small moments that build atmosphere
2. **Crisis Events**: Urgent situations requiring immediate response
3. **Relationship Events**: Interactions with family, friends, neighbors
4. **Legacy Events**: Opportunities to leave something behind
5. **Background-Specific Events**: Unique to character type

## User Interface Design

### Layout Structure
```
┌─────────────────────────────────────┐
│              TITLE BAR              │
│         "The Final Year"            │
├─────────────────────────────────────┤
│  RESOURCES BAR                      │
│  Hope: ████████░░ 80/100           │
│  Relationships: ██████░░░░ 60/100   │
│  Supplies: ████░░░░░░ 40/100       │
│  Time: Week 23 of 52               │
├─────────────────────────────────────┤
│                                     │
│         EVENT DESCRIPTION           │
│      (Main narrative text)          │
│                                     │
├─────────────────────────────────────┤
│         CHOICE BUTTONS              │
│  [Choice A]  [Choice B]  [Choice C] │
└─────────────────────────────────────┘
```

### Visual Design Elements
- Dark, muted color palette (grays, deep blues, earth tones)
- Subtle animations for resource changes
- Typewriter effect for text reveal
- Soft shadows and rounded corners for warmth
- Progress bars with gentle gradients
- Hover effects on buttons

### Mobile Responsiveness
- Stack elements vertically on small screens
- Larger touch targets for buttons
- Readable font sizes (minimum 16px)
- Simplified layout for mobile

## Game Flow

### 1. Title Screen
- Game title with atmospheric background
- Brief introduction paragraph
- "Begin Your Final Year" button

### 2. Character Selection
- 5 character cards with descriptions
- Each shows starting resource values
- Preview of unique background trait

### 3. Main Game Loop
- Present event text
- Show 2-3 choice options
- Display resource changes after choice
- Advance time (1-3 weeks per event)
- Trigger special events based on resources/background

### 4. Ending Sequence
- Final week arrives
- Major final choice based on accumulated resources
- Narrative ending reflecting player's journey
- Option to restart with different character

## Technical Implementation Notes

### State Management
- Game state object containing all variables
- Save/load functionality using localStorage
- Event history tracking for narrative consistency

### Event System
- JSON structure for events with conditions
- Random selection with weighted probabilities
- Branching logic based on previous choices

### Resource Visualization
- Animated progress bars
- Color coding (green=good, yellow=warning, red=critical)
- Smooth transitions for value changes

