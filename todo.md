### Phase 1: Init the project
- All done.

### Phase 2: Refactor Event Structure
- [ ] Modify `story_data.js` to include the following properties for all events:
    - [ ] `id`: Unique identifier for each event
    - [ ] `phase`: Event clustering ("early", "mid", "late") to control story escalation
    - [ ] `flags`: `requires` and `blocks` arrays to create event chains
    - [ ] `weight`: To control the frequency of events
    - [ ] `once`: Boolean to prevent key emotional moments from repeating
- [ ] Update `script.js` to filter, select, and process events based on these new properties

### Phase 3: Implement New Core Mechanics
- [ ] **Momentum:** Implement a running average of the last 3-5 Hope results to apply a passive modifier to new choices
- [ ] **Relationship Tiers:**
    - [ ] Implement tier logic in `script.js` (e.g., 0-25 "Estranged", 26-50 "Acquaintances", 51-75 "Trusted", 76-100 "Beloved")
    - [ ] Modify event selection to trigger certain events only at specific relationship tiers
- [ ] **Credibility:** Implement a hidden "Rumors/Credibility" meta-resource, primarily for Scientist & Resistor storylines

### Phase 4: Integrate New Storyline Content
- [ ] Add the new sample events to `story_data.js`, ensuring they use the new properties (`id`, `phase`, `flags`, `weight`, `once`):
    - [ ] **Parent:** "The Evacuation Lottery"
    - [ ] **Scientist:** "The Mobile Lab"
    - [ ] **Artist:** "The Final Exhibition"
    - [ ] **Caregiver:** "The Long March"
    - [ ] **Resistor:** "The Broadcast Tower"
    - [ ] **Universal:** "The Red Sky"
    - [ ] **Random:** "Mysterious Transmission"

### Phase 5: Balancing and Tuning
- [ ] **Resource Caps & States:**
    - [ ] Implement Hope game-end conditions (Despair at ≤0, Transcendent Win at ≥120)
    - [ ] Implement Supplies "resource collapse" state at ≤0, applying a recurring negative event modifier
- [ ] **Event Logic & Weighting:**
    - [ ] Implement logic for Relationships to affect random-event weighting (e.g., low relationships increase hostile encounters)
    - [ ] Enforce opposing-resource dilemmas where high Hope gains often mean high Supply losses
- [ ] **Event Magnitudes:**
    - [ ] Adjust all event stat changes to fit thematic magnitude tiers:
        - [ ] **Minor:** ±1-4 (e.g., soft moments, daily struggles)
        - [ ] **Meaningful:** ±5-9 (e.g., significant decisions)
        - [ ] **Major:** ±10-20 (e.g., turning points, used sparingly)
    - [ ] Ensure "soft-moments" (like listening to music) have smaller impacts than major life-or-death events

### Phase 6: Testing
- [ ] Write comprehensive testing of all new mechanics (Momentum, Relationship Tiers, Credibility)
- [ ] Verify event logic works as expected (phasing, flags, weighting, `once` property)
- [ ] Test all new storyline events and character-specific content

### Phase 7: Polish and Final Touches
- [ ] Add small continuity call-backs (e.g., a rescued character reappears later)
- [ ] Implement at least one "quiet win" ending (e.g., the community garden survives)
- [ ] Evolve the soundtrack or thematic text descriptions to match game progression (e.g., hopeful vs. dissonant)

### Phase 8: Documentation and Delivery
- [ ] Update `README.md` with new features and instructions
- [ ] Update `game_design.md` with detailed explanations of the new mechanics
- [ ] Convert the project to Github Pages

### Development Process & Workflow Notes
- Draft scenes first, then apply number balancing in a later pass
- Consider using a shared spreadsheet to visualize cumulative resource changes
