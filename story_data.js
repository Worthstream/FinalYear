
// Story Data for The Final Year
// This file contains all narrative content, events, and choices

const STORY_DATA = {
    // Character-specific events
    characterEvents: {
        parent: [
            {
                id: "parent_01",
                phase: "early",
                flags: { requires: [], blocks: [] },
                weight: 1,
                once: false,
                text: "Your child draws a picture of your family together, with everyone smiling. They hand it to you with pride, asking if you'll keep it forever. In the drawing, the sun is shining and there are flowers everywhere.",
                choices: [
                    { text: "Frame it immediately and hang it where everyone can see", effects: { hope: 8, relationships: 5 } },
                    { text: "Put it safely in a memory box with other precious things", effects: { hope: 5, relationships: 8 } },
                    { text: "Thank them but set it aside - you have too much to do", effects: { hope: -3, relationships: -3 } }
                ]
            },
            {
                id: "parent_02",
                phase: "early",
                flags: { requires: [], blocks: [] },
                weight: 1,
                once: false,
                text: "Food rationing has begun in your area. Your family's allocation will be tight, but you notice your elderly neighbor hasn't been able to get to the distribution center. She sits by her window, looking frail and worried.",
                choices: [
                    { text: "Share part of your family's ration with your neighbor", effects: { relationships: 8, supplies: -6, hope: 4 } },
                    { text: "Offer to pick up their ration when you get yours", effects: { relationships: 5, hope: 3 } },
                    { text: "Focus on your own family's needs first", effects: { supplies: 4, relationships: -3 } }
                ]
            },
            {
                id: "parent_03",
                phase: "mid",
                flags: { requires: [], blocks: [] },
                weight: 1,
                once: false,
                text: "Your teenager asks if they should bother applying to college. 'What's the point?' they say, staring at the application forms. The weight of an uncertain future hangs in the air between you.",
                choices: [
                    { text: "Encourage them to apply - hope for the future matters", effects: { hope: 6, relationships: 5, supplies: -2 } },
                    { text: "Suggest focusing on practical skills instead", effects: { hope: -1, relationships: 3, supplies: 4 } },
                    { text: "Tell them the choice is theirs to make", effects: { hope: 2, relationships: 4 } }
                ]
            },
            {
                id: "parent_04",
                phase: "mid",
                flags: { requires: [], blocks: [] },
                weight: 1,
                once: false,
                text: "Your family finds an old board game while packing. Your children beg you to play 'just one more time' before you have to decide what to keep and what to leave behind.",
                choices: [
                    { text: "Spend the evening playing games and laughing together", effects: { hope: 10, relationships: 8, supplies: -2 } },
                    { text: "Play for a little while, then get back to packing", effects: { hope: 4, relationships: 4, supplies: 2 } },
                    { text: "Insist you need to focus on practical preparations", effects: { hope: -3, relationships: -6, supplies: 6 } }
                ]
            },
            {
                id: "parent_05",
                phase: "late",
                flags: { requires: [], blocks: [] },
                weight: 1,
                once: false,
                text: "Your child has nightmares about the future and crawls into bed with you, trembling. They whisper, 'Will we be okay?' Their eyes search your face for reassurance you're not sure you can give.",
                choices: [
                    { text: "Hold them close and promise you'll face whatever comes together", effects: { hope: 5, relationships: 10, supplies: -1 } },
                    { text: "Acknowledge their fears but focus on what you can control", effects: { hope: 3, relationships: 5, supplies: 2 } },
                    { text: "Try to distract them with practical preparations", effects: { hope: -2, relationships: -2, supplies: 4 } }
                ]
            },
            {
                id: "parent_evacuation",
                phase: "late",
                flags: { requires: [], blocks: [] },
                weight: 2,
                once: true,
                text: "A rumor spreads: limited seats on an evacuation convoy. Each family can enter one name in a lottery.",
                choices: [
                    { text: "Enter your teenager's name", effects: { hope: 3, relationships: -2, supplies: -3 } },
                    { text: "Enter your own name and promise to send help later", effects: { hope: -5, relationships: -10, supplies: 2 } },
                    { text: "Refuse to participate; you'll stay together", effects: { hope: 5, relationships: 8, supplies: -2 } }
                ]
            }
        ],

        scientist: [
            {
                id: "scientist_01",
                phase: "early",
                flags: { requires: [], blocks: [] },
                weight: 1,
                once: false,
                text: "Your research data shows the collapse is accelerating faster than public reports indicate. Colleagues ask if you'll help them prepare a more honest assessment for the community. The truth is terrifying, but people deserve to know.",
                choices: [
                    { text: "Help create an honest but hopeful report", effects: { hope: -3, relationships: 6, supplies: 2 } },
                    { text: "Refuse - people aren't ready for the full truth", effects: { hope: 4, relationships: -4, supplies: 4 } },
                    { text: "Share the data but let others decide what to do", effects: { relationships: 3, supplies: 2 } }
                ]
            },
            {
                id: "scientist_02",
                phase: "mid",
                flags: { requires: [], blocks: [] },
                weight: 1,
                once: false,
                text: "A group of survivors asks you to help design a water purification system for their community. It would take weeks of your time and most of your equipment, but could save dozens of lives.",
                choices: [
                    { text: "Dedicate yourself fully to helping them", effects: { hope: 6, relationships: 10, supplies: -12 } },
                    { text: "Provide the plans but keep your equipment", effects: { hope: 3, relationships: 4, supplies: -4 } },
                    { text: "Politely decline - you need your resources", effects: { hope: -2, supplies: 6 } }
                ]
            },
            {
                id: "scientist_03",
                phase: "late",
                flags: { requires: ["lab_intact"], blocks: ["scientist_04"] },
                weight: 2,
                once: true,
                text: "You discover a potential solution that might slow the collapse, but it would require convincing world leaders to act immediately. The chances of success seem impossibly small.",
                choices: [
                    { text: "Dedicate everything to trying to save the world", effects: { hope: 12, relationships: -4, supplies: -8 } },
                    { text: "Share the research but focus on local solutions", effects: { hope: 4, relationships: 4, supplies: 2 } },
                    { text: "Keep the research private - it's too late anyway", effects: { hope: -6, relationships: -2, supplies: 6 } }
                ]
            },
            {
                id: "scientist_04",
                phase: "mid",
                flags: { requires: [], blocks: [] },
                weight: 1,
                once: false,
                text: "A former student contacts you, desperate for guidance. They're leading a small community and need to know how much time they have to prepare. You could give them false hope or crushing truth.",
                choices: [
                    { text: "Give them the unvarnished truth and help them prepare", effects: { hope: -2, relationships: 6, supplies: -2 } },
                    { text: "Provide cautious estimates with room for hope", effects: { hope: 4, relationships: 4, supplies: 1 } },
                    { text: "Encourage them to focus on immediate needs only", effects: { hope: 2, relationships: 2, supplies: 4 } }
                ]
            },
            {
                id: "scientist_05",
                phase: "late",
                flags: { requires: [], blocks: [] },
                weight: 1,
                once: false,
                text: "Your laboratory is being shut down. You have one last chance to preserve your life's work - either in digital archives that might survive, or by teaching everything to a small group of apprentices.",
                choices: [
                    { text: "Focus on digital preservation for the future", effects: { hope: 6, relationships: 2, supplies: 2 } },
                    { text: "Teach everything to apprentices who can carry it forward", effects: { hope: 5, relationships: 8, supplies: -2 } },
                    { text: "Try to do both, even if neither is perfect", effects: { hope: 3, relationships: 5, supplies: 0 } }
                ]
            },
            {
                id: "scientist_mobile_lab",
                phase: "mid",
                flags: { requires: [], blocks: [] },
                weight: 2,
                once: true,
                text: "A tech NGO offers to mount your equipment on a truck, letting you stay mobile but making sabotage more likely.",
                choices: [
                    { text: "Accept and go mobile", effects: { hope: 5, supplies: -10, relationships: 4 } },
                    { text: "Decline; stay hidden in current lab", effects: { hope: -2, supplies: 2 } },
                    { text: "Donate equipment, keep only data", effects: { hope: 3, supplies: -5, relationships: 8 } }
                ]
            }
        ],

        artist: [
            {
                id: "artist_01",
                phase: "early",
                flags: { requires: [], blocks: [] },
                weight: 1,
                once: false,
                text: "You've been documenting the changing world through your art. A local museum offers to preserve your work, but they want you to focus on 'uplifting' pieces rather than the darker realities you've been capturing.",
                choices: [
                    { text: "Accept and create hopeful art for future generations", effects: { hope: 8, relationships: 4, supplies: 2 } },
                    { text: "Decline and continue documenting the truth", effects: { hope: -2, relationships: -2, supplies: -2 } },
                    { text: "Compromise - create both types of work", effects: { hope: 2, relationships: 2, supplies: 1 } }
                ]
            },
            {
                id: "artist_02",
                phase: "early",
                flags: { requires: [], blocks: [] },
                weight: 1,
                once: false,
                text: "Children in your neighborhood ask you to teach them to paint. Their parents hope art might help them process what's happening to the world. You see the fear and confusion in their young eyes.",
                choices: [
                    { text: "Start regular art classes for the children", effects: { hope: 10, relationships: 8, supplies: -4 } },
                    { text: "Teach them occasionally when you have time", effects: { hope: 4, relationships: 4 } },
                    { text: "Suggest they find someone else - you're too busy", effects: { hope: -4, relationships: -6 } }
                ]
            },
            {
                id: "artist_03",
                phase: "mid",
                flags: { requires: [], blocks: [] },
                weight: 1,
                once: false,
                text: "You find the perfect spot to create your masterpiece - a mural that captures both the beauty and tragedy of this final year. But the wall belongs to a building scheduled for demolition.",
                choices: [
                    { text: "Paint the mural anyway - art transcends ownership", effects: { hope: 8, relationships: -2, supplies: -4 } },
                    { text: "Ask permission and risk being told no", effects: { hope: 2, relationships: 4, supplies: -2 } },
                    { text: "Find a different, safer location", effects: { hope: 1, relationships: 2, supplies: 2 } }
                ]
            },
            {
                id: "artist_04",
                phase: "mid",
                flags: { requires: [], blocks: [] },
                weight: 1,
                once: false,
                text: "A wealthy collector offers to buy all your recent work for enough money to secure your family's survival. But they plan to hide the art in a private vault where no one will see it.",
                choices: [
                    { text: "Sell the work to protect your family", effects: { hope: -4, relationships: 4, supplies: 12 } },
                    { text: "Refuse and find other ways to survive", effects: { hope: 6, relationships: 2, supplies: -6 } },
                    { text: "Negotiate to keep some pieces public", effects: { hope: 2, relationships: 2, supplies: 6 } }
                ]
            },
            {
                id: "artist_05",
                phase: "late",
                flags: { requires: [], blocks: [] },
                weight: 1,
                once: false,
                text: "You discover a cache of art supplies in an abandoned studio. There's enough to last months, but taking them feels like grave robbing. A note suggests the artist hoped someone would continue their work.",
                choices: [
                    { text: "Take the supplies and honor their artistic legacy", effects: { hope: 6, relationships: 2, supplies: 8 } },
                    { text: "Take only what you need and leave the rest", effects: { hope: 4, relationships: 4, supplies: 4 } },
                    { text: "Leave everything untouched out of respect", effects: { hope: 2, relationships: 6, supplies: -2 } }
                ]
            },
            {
                id: "artist_final_exhibition",
                phase: "late",
                flags: { requires: [], blocks: [] },
                weight: 2,
                once: true,
                text: "A pop-up gallery wants one last exhibition: 'Art at the End of the World.' Space is limited.",
                choices: [
                    { text: "Curate a community showcase", effects: { hope: 10, relationships: 10, supplies: -5 } },
                    { text: "Show only your own work; secure a sponsor", effects: { hope: 3, relationships: -4, supplies: 8 } },
                    { text: "Decline; street art reaches more people", effects: { hope: 5, relationships: 2, supplies: -2 } }
                ]
            }
        ],

        caregiver: [
            {
                id: "caregiver_01",
                phase: "early",
                flags: { requires: [], blocks: [] },
                weight: 1,
                once: false,
                text: "The local shelter is overwhelmed with people who have nowhere else to go. They desperately need volunteers, but you're already stretched thin caring for others. Your own health is beginning to suffer.",
                choices: [
                    { text: "Volunteer despite your exhaustion", effects: { hope: 4, relationships: 12, supplies: -8 } },
                    { text: "Help organize other volunteers instead", effects: { hope: 2, relationships: 6, supplies: -2 } },
                    { text: "Focus on the people you're already helping", effects: { hope: -1, relationships: 2, supplies: 2 } }
                ]
            },
            {
                id: "caregiver_02",
                phase: "early",
                flags: { requires: [], blocks: [] },
                weight: 1,
                once: false,
                text: "An elderly person you care for asks you to help them write letters to family members they haven't spoken to in years. They want to make peace before it's too late. Their hands shake as they try to hold the pen.",
                choices: [
                    { text: "Spend the day helping them write heartfelt letters", effects: { hope: 6, relationships: 10, supplies: -2 } },
                    { text: "Help them make phone calls instead - it's faster", effects: { hope: 4, relationships: 6 } },
                    { text: "Suggest they focus on the family who are still close", effects: { hope: -2, relationships: -4, supplies: 2 } }
                ]
            },
            {
                id: "caregiver_03",
                phase: "mid",
                flags: { requires: [], blocks: [] },
                weight: 1,
                once: false,
                text: "A family with young children has been evicted and has nowhere to go. Your own space is small, but you could make room. The children look scared and hungry.",
                choices: [
                    { text: "Invite them to stay as long as needed", effects: { hope: 5, relationships: 12, supplies: -10 } },
                    { text: "Let them stay for a few days while they find alternatives", effects: { hope: 3, relationships: 6, supplies: -4 } },
                    { text: "Help them find other resources but can't house them", effects: { hope: -1, relationships: 2, supplies: 2 } }
                ]
            },
            {
                id: "caregiver_04",
                phase: "mid",
                flags: { requires: [], blocks: [] },
                weight: 1,
                once: false,
                text: "Someone you've been caring for is dying. They ask you to stay with them in their final hours rather than attending to your other responsibilities. They don't want to be alone.",
                choices: [
                    { text: "Stay with them until the end", effects: { hope: 4, relationships: 10, supplies: -4 } },
                    { text: "Arrange for family to be with them instead", effects: { hope: 2, relationships: 4, supplies: 2 } },
                    { text: "Visit when you can but maintain your other duties", effects: { hope: -2, relationships: -2, supplies: 4 } }
                ]
            },
            {
                id: "caregiver_05",
                phase: "late",
                flags: { requires: [], blocks: [] },
                weight: 1,
                once: false,
                text: "Medical supplies are running dangerously low. You could hoard what you have for the people you're already caring for, or distribute them more widely to help more people for a shorter time.",
                choices: [
                    { text: "Distribute supplies to help as many as possible", effects: { hope: 6, relationships: 10, supplies: -6 } },
                    { text: "Keep supplies for your current patients", effects: { hope: -1, relationships: 4, supplies: 4 } },
                    { text: "Try to find more supplies before deciding", effects: { hope: 2, relationships: 2, supplies: 0 } }
                ]
            },
            {
                id: "caregiver_long_march",
                phase: "late",
                flags: { requires: [], blocks: [] },
                weight: 2,
                once: true,
                text: "A mobile column of refugees passes your clinic. Many are barefoot and injured.",
                choices: [
                    { text: "Convert clinic into triage center", effects: { hope: 8, relationships: 15, supplies: -15 } },
                    { text: "Distribute painkillers, then move them along", effects: { hope: 3, relationships: 6, supplies: -5 } },
                    { text: "Lock doors; you can't handle more", effects: { hope: -6, relationships: -10, supplies: 5 } }
                ]
            }
        ],

        resistor: [
            {
                id: "resistor_01",
                phase: "early",
                flags: { requires: [], blocks: [] },
                weight: 1,
                once: false,
                text: "Your resistance group has discovered a cache of supplies hoarded by wealthy elites while people starve. You could redistribute them to those in need, but it would be risky and definitely illegal.",
                choices: [
                    { text: "Lead the mission to redistribute the supplies", effects: { hope: 8, relationships: 6, supplies: 12 } },
                    { text: "Report the location to community leaders instead", effects: { hope: 2, relationships: 4, supplies: 4 } },
                    { text: "Leave it alone - the risk is too great", effects: { hope: -6, relationships: -4, supplies: 2 } }
                ]
            },
            {
                id: "resistor_02",
                phase: "early",
                flags: { requires: [], blocks: [] },
                weight: 1,
                once: false,
                text: "Government forces are cracking down on resistance activities. Some of your group want to go underground, others want to fight back openly. The community looks to you for leadership.",
                choices: [
                    { text: "Advocate for going underground to survive", effects: { hope: -4, relationships: 4, supplies: 6 } },
                    { text: "Support open resistance despite the risks", effects: { hope: 6, relationships: 8, supplies: -8 } },
                    { text: "Suggest the group split up for safety", effects: { hope: -2, relationships: -6, supplies: 4 } }
                ]
            },
            {
                id: "resistor_03",
                phase: "mid",
                flags: { requires: [], blocks: [] },
                weight: 1,
                once: false,
                text: "You've intercepted communications showing a planned raid on a refugee camp. You could warn them, but it would expose your intelligence network and put your group at risk.",
                choices: [
                    { text: "Warn the camp immediately, regardless of the cost", effects: { hope: 8, relationships: 10, supplies: -6 } },
                    { text: "Find an anonymous way to tip them off", effects: { hope: 4, relationships: 5, supplies: -2 } },
                    { text: "Protect your network - you can't save everyone", effects: { hope: -6, relationships: -4, supplies: 4 } }
                ]
            },
            {
                id: "resistor_04",
                phase: "mid",
                flags: { requires: [], blocks: [] },
                weight: 1,
                once: false,
                text: "A former government official wants to defect and join your cause. They have valuable information but their presence would make your group a high-priority target.",
                choices: [
                    { text: "Welcome them and use their knowledge", effects: { hope: 6, relationships: 4, supplies: -4 } },
                    { text: "Accept their information but keep them at distance", effects: { hope: 2, relationships: 2, supplies: 2 } },
                    { text: "Refuse - it's too dangerous", effects: { hope: -2, relationships: -2, supplies: 6 } }
                ]
            },
            {
                id: "resistor_05",
                phase: "mid",
                flags: { requires: [], blocks: [] },
                weight: 1,
                once: false,
                text: "Your resistance cell has the opportunity to sabotage infrastructure that's being used to oppress people, but the same infrastructure provides essential services to innocent families.",
                choices: [
                    { text: "Proceed with sabotage - the greater good demands it", effects: { hope: 4, relationships: -4, supplies: 6 } },
                    { text: "Find a way to target only the oppressive elements", effects: { hope: 6, relationships: 4, supplies: -4 } },
                    { text: "Abandon the mission to protect innocent people", effects: { hope: -4, relationships: 6, supplies: -2 } }
                ]
            },
            {
                id: "resistor_06",
                phase: "late",
                flags: { requires: [], blocks: [] },
                weight: 1,
                once: false,
                text: "Riots have broken out in the city center after food distribution was suspended. Your group could join the chaos to make a statement, or try to protect vulnerable people caught in the violence.",
                choices: [
                    { text: "Join the riots and channel the anger toward real change", effects: { hope: 6, relationships: -2, supplies: 4 } },
                    { text: "Organize protection for civilians caught in the violence", effects: { hope: 4, relationships: 10, supplies: -6 } },
                    { text: "Stay away and keep your group safe", effects: { hope: -4, relationships: -2, supplies: 6 } }
                ]
            },
            {
                id: "resistor_07",
                phase: "late",
                flags: { requires: [], blocks: [] },
                weight: 1,
                once: false,
                text: "Police have started arresting people for 'spreading panic' about the collapse. Your underground network could help people escape, but it would put everyone at greater risk.",
                choices: [
                    { text: "Expand operations to help more people escape persecution", effects: { hope: 8, relationships: 6, supplies: -10 } },
                    { text: "Help selectively while maintaining operational security", effects: { hope: 4, relationships: 4, supplies: -4 } },
                    { text: "Shut down operations to protect your existing network", effects: { hope: -6, relationships: -4, supplies: 6 } }
                ]
            },
            {
                id: "resistor_08",
                phase: "late",
                flags: { requires: [], blocks: [] },
                weight: 1,
                once: false,
                text: "A peaceful protest you organized has turned violent after police intervention. People are getting hurt, and you have seconds to decide how to respond.",
                choices: [
                    { text: "Rally the crowd to stand their ground and fight back", effects: { hope: 5, relationships: 2, supplies: -6 } },
                    { text: "Try to de-escalate and get people to safety", effects: { hope: 2, relationships: 8, supplies: -2 } },
                    { text: "Slip away to avoid arrest and preserve leadership", effects: { hope: -4, relationships: -6, supplies: 4 } }
                ]
            },
            {
                id: "resistor_broadcast_tower",
                phase: "late",
                flags: { requires: [], blocks: [] },
                weight: 2,
                once: true,
                text: "You can hijack the emergency broadcast network for 30 seconds.",
                choices: [
                    { text: "Call for nationwide peaceful protests", effects: { hope: 15, relationships: 8, supplies: -12 } },
                    { text: "Reveal elite corruption files", effects: { hope: 8, relationships: 5, supplies: -5 } },
                    { text: "Redirect signals to jam martial-law drones", effects: { hope: 5, relationships: 3, supplies: -8 } }
                ]
            }
        ]
    },

    // Universal events that apply to all characters
    universalEvents: [
        {
            id: "universal_01",
            phase: "early",
            flags: { requires: [], blocks: [] },
            weight: 1,
            once: false,
            text: "A stranger approaches you on the street and offers a genuine smile. In these dark times, such simple human kindness feels precious and rare. They ask if you're doing okay.",
            choices: [
                { text: "Stop and have a real conversation with them", effects: { hope: 6, relationships: 4, supplies: -1 } },
                { text: "Smile back and exchange pleasantries", effects: { hope: 3, relationships: 2 } },
                { text: "Politely decline and keep moving", effects: { hope: -1, supplies: 1 } }
            ]
        },
        {
            id: "universal_02",
            phase: "early",
            flags: { requires: [], blocks: [] },
            weight: 1,
            once: false,
            text: "Someone has started a community garden in an abandoned lot. Neighbors are working together, sharing seeds and tools. There's laughter mixed with the sound of digging.",
            choices: [
                { text: "Join in and help with the gardening", effects: { hope: 5, relationships: 6, supplies: 2 } },
                { text: "Donate some supplies to the effort", effects: { hope: 3, relationships: 4, supplies: -3 } },
                { text: "Watch from a distance but don't get involved", effects: { hope: 1, supplies: 1 } }
            ]
        },
        {
            id: "universal_03",
            phase: "mid",
            flags: { requires: [], blocks: [] },
            weight: 1,
            once: false,
            text: "An elderly couple sits on their porch, holding hands and watching the sunset. Despite everything happening, they seem at peace. They wave at you as you pass.",
            choices: [
                { text: "Stop and chat with them about their long life together", effects: { hope: 4, relationships: 5 } },
                { text: "Wave back and continue on your way", effects: { hope: 2, relationships: 1 } },
                { text: "Feel envious of their peace and hurry past", effects: { hope: -2, supplies: 1 } }
            ]
        },
        {
            id: "universal_04",
            phase: "mid",
            flags: { requires: [], blocks: [] },
            weight: 1,
            once: false,
            text: "You find an old photo album while cleaning. The pictures show happier times - family gatherings, celebrations, ordinary moments that now seem precious beyond measure.",
            choices: [
                { text: "Spend the evening looking through every photo and remembering", effects: { hope: 6, relationships: 3, supplies: -1 } },
                { text: "Share the photos with family and friends", effects: { hope: 4, relationships: 6 } },
                { text: "Put it away - it's too painful to look at now", effects: { hope: -3, supplies: 2 } }
            ]
        },
        {
            id: "universal_05",
            phase: "late",
            flags: { requires: [], blocks: [] },
            weight: 1,
            once: false,
            text: "A child has drawn hopeful messages in chalk on the sidewalk: 'Tomorrow will be better' and 'We are stronger together.' The drawings are simple but powerful.",
            choices: [
                { text: "Add your own hopeful message to theirs", effects: { hope: 5, relationships: 3 } },
                { text: "Take a photo to preserve the moment", effects: { hope: 3, relationships: 1, supplies: -1 } },
                { text: "Walk past without engaging", effects: { hope: -1, supplies: 1 } }
            ]
        },
        {
            id: "universal_red_sky",
            phase: "mid",
            flags: { requires: [], blocks: [] },
            weight: 2,
            once: true,
            text: "A blood-red sunset paints the horizon; atmospheric dust from distant fires. Everyone stops to watch.",
            choices: [
                { text: "Organize a spontaneous neighborhood vigil", effects: { hope: 8, relationships: 10, supplies: -2 } },
                { text: "Take scientific readings for future records", effects: { hope: 3, relationships: 2, supplies: 1 } },
                { text: "Use the distraction to quietly scavenge", effects: { hope: -2, supplies: 5 } }
            ]
        }
    ],

    // Random events for variety
    randomEvents: [
        {
            id: "random_01",
            phase: "early",
            flags: { requires: [], blocks: [] },
            weight: 1,
            once: false,
            text: "You discover a hidden cache of supplies in an abandoned building. It's not much, but every little bit helps in these times.",
            choices: [
                { text: "Take everything you can carry", effects: { supplies: 8, hope: 2 } },
                { text: "Take only what you need and leave the rest", effects: { supplies: 4, hope: 3, relationships: 2 } },
                { text: "Mark the location and tell others about it", effects: { hope: 4, relationships: 6, supplies: 2 } }
            ]
        },
        {
            id: "random_02",
            phase: "mid",
            flags: { requires: [], blocks: [] },
            weight: 1,
            once: false,
            text: "A traveling musician plays songs on a street corner, their guitar case open for donations. A small crowd has gathered, and people are actually smiling.",
            choices: [
                { text: "Stay and listen, maybe even sing along", effects: { hope: 6, relationships: 4, supplies: -2 } },
                { text: "Drop a small donation and move on", effects: { hope: 2, relationships: 2, supplies: -1 } },
                { text: "Enjoy the music but keep your resources", effects: { hope: 3, relationships: 1 } }
            ]
        },
        {
            id: "random_03",
            phase: "late",
            flags: { requires: [], blocks: [] },
            weight: 1,
            once: false,
            text: "You encounter a lost pet wandering the streets. It's clearly someone's beloved companion, but there's no sign of its owner.",
            choices: [
                { text: "Take the pet in and care for it", effects: { hope: 4, relationships: 2, supplies: -4 } },
                { text: "Try to find the owner by asking around", effects: { hope: 2, relationships: 4, supplies: -1 } },
                { text: "Leave it alone - you can't take on more responsibility", effects: { hope: -2, supplies: 2 } }
            ]
        },
        {
            id: "random_mysterious_transmission",
            phase: "late",
            flags: { requires: [], blocks: [] },
            weight: 2,
            once: true,
            text: "A short-wave radio crackles: a voice reading coordinates and saying 'Sanctuary.'",
            choices: [
                { text: "Investigate immediately", effects: { hope: 10, supplies: -8 } },
                { text: "Share coordinates with community", effects: { hope: 6, relationships: 6, supplies: -2 } },
                { text: "Ignore; probably a trap", effects: { hope: -3, supplies: 3 } }
            ]
        }
    ],

    // Starting stats for each character
    startingStats: {
        parent: { hope: 60, relationships: 65, supplies: 80 },
        scientist: { hope: 55, relationships: 50, supplies: 75 },
        artist: { hope: 70, relationships: 60, supplies: 60 },
        caregiver: { hope: 65, relationships: 80, supplies: 55 },
        resistor: { hope: 60, relationships: 65, supplies: 80 }
    }
};

