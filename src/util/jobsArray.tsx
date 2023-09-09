const jobsArray = [
    {
      name: "Warrior",
      description: "Melee fighters that are balanced between attack and defense.",
      twoHourAbility: "Mighty Strikes",
      twoHourDescription: "The Warrior's Mighty Strikes two-hour ability is always there to save the day. Hold on to this wonderful power until you enter a fight that looks far worse than anticipated. If you reach half health before the enemy, hit the two-hour and make those criticals count. Don't wait until you reach a quarter health and expect this ability to save you. Because the ability lasts for nearly a minute, it's better to use it as soon as possible.",
      blurbTitle: "So You Want To Be A Hero?",
      blurbDescription: "Warriors don't have an easy time of things. It's a hard road learning how to protect a party while keeping yourself in one piece. Dark Knights, Rangers, Ninjas, Black Mages; all of them can rely on their deadly arts to save themselves from monsters. You get a suit of armor, a weapon, and that's about it.Without friends, you're going to be second rate, a has been. Find your place in a group of healers and casters, and the entire realm will know of your bravery. They may call us Warriors, but we are truly defenders!",
      image: "realWarrior.webp"
    },
    {
      name: "Monk",
      description: "Powerful frontline fighters who use hand-to-hand combat against their opponents.",
      twoHourAbility: "Hundred Fists",
      twoHourDescription: "Hundred Fists is one of the finest melee abilities in all the basic jobs. Monks have one minute to unleash almost constant attacks once they get up to speed. This leads to wicked damage and a scary amount of aggression. Use Hundred Fists to get out of a sticky situation.",
      blurbTitle: "Things You Don't Want A Monk To Say",
      blurbDescription: 
      "-What? The Warrior was pulling something, too? \\n -Hundred Fists ia an okay ability, I guess, but it could be better. \\n -I've got the next monster; I wanna check out my new armor. \\n -I'm going to specialize in great axes. \\n -I'm just raising my support job- I'm really a White Mage. \\n -We don't need a Warrior. Grab another Black Mage and let me hold aggro.",
      image: "realMonk.jfif"
    },
    {
      name: "Thief",
      description: "Thieves are melee fighters that use speed and flexibility to penetrate an enemy's defense, then nimbly dart away before the retailiatory enemy attack.",
      twoHourAbility: "Perfect Dodge",
      twoHourDescription: "A Thief's two-hour ability is called Perfect Dodge. The best time to use this ability is when you and your opponent are pretty beaten up, but the monster has the edge and has the best chance of winning the fight. At this point, simply use Perfect Dodge and know that a monster's attack will miss while your character's strikes will continue to wear it down. Perfect Dodge only lasts for 30 seconds, so make everything count. You don't want to use up something that takes 2 hours to recharge if you know that you won't survive an encounter.",
      blurbTitle: "The First Rule Is Not To Be Seen",
      blurbDescription: "The first thing you should know is that there are old thieves and there are bold thieves, but there are no old, bold thieves. Know your own limits and abilities. You must appreciate subtlety and skill, and if you want something, don't just walk up and try to take it. You need to know when to stalk, when to pounce, and when to whisper back into the shadows. Learn about feints and misdirection and, if at all possible, let someone else take the damage instead. Wait until the target is concentrating on what is in front of them; that's the perfect time to slip around and get what you want.",
      image: "realThief.jfif"
    },
    {
      name: "White Mage",
      description: "As a White Mage, the primary role is to use the healing powers to keep a party healthy.",
      twoHourAbility: "Benediction",
      twoHourDescription: "Benediction is a wonderful thing to have when there is nothing else left to rely on. It is, however, a dangerous thing to fall back on. Monsters are drawn to a White Mage to the exclusion of everyone else, and using Benediction means that the mage has a significant chance of dying. Don't be shy about letting other members of the party know that you have used it either; Benediction is a last resort, and people should know if it is not available.",
      blurbTitle: "Things A Party Never Wants To Hear A White Mage Say",
      blurbDescription: "-I wonder what would happen if I healed that elemental... \\n -Where are you guys? \\n -I've been healing that monster the whole time! No wonder you all looked hurt. \\n -[In the middle of a fight.] Just left for a moment but I'm back now. What's going on? \\n -It's my turn to tank!",
      image: "realWhitemage.jfif"
    },
    {
      name: "Black Mage",
      description: "Black Mages are powerful sorcerers that use their magical abilities to attack enemies through direct damage spells and enfeebling magic.",
      twoHourAbility: "Manafont",
      twoHourDescription: "The Black Mage Two-Hour Ability is called Manafont, and it enables the Black Mage to cast spells without using Magic Points for a duration of 30 seconds. Use this ability carefully and only under specific situations, because you will recieve major aggro once you start chain-casting. When soloing, use Manafont when trouble arises and you need to bring down the monster quickly. When in a party, use Manafont when the entire group is in trouble AND another character (like a Monk or Paladin) has hit his or her two-hour ability. Let them go first to get the monster's aggression, then start Manafont and cast away.",
      blurbTitle: "Black Mages: More Than Just Blowing Stuff Up",
      blurbDescription: "Deep inside, everyone wants to call rocks from under the earth and harness the power of storms. All the potential of the elements and the Dark Magic that whispers in the night can be yours. You can summon lightning to strike foes or batter their bodies with flame and wind. But the Black Mage's role isn't just crass, brutal actions. Let the fighters have their pokes and jabs with their puny swords and knives. With all the gifts at our disposal, we can weaken an enemy down to a pathetic shell with poisons and even steal their HP and take it for our own with draining abilities. We may not be the strongest in body, but our intelligence has enabled us to master the very forces of nature and darkness itself- and that makes us deadly!",
      image: "realBlackmage.jfif"
    },
    {
      name: "Red Mage",
      description: "Red Mages have a little bit of everything.",
      twoHourAbility: "Chainspell",
      twoHourDescription: "The Red Mage two-hour ability, Chainspell, eliminates the casting time between spells. Like most other two-hour abilities, it is designed to be used when things aren't going well. This ability enables your character to focus large amounts of elemental damage on a target to kill it as quickly as possible. Additionally, if your party is in trouble, pull out the Cure spells to save the day.",
      blurbTitle: "A Lifestyle For The Active Mage",
      blurbDescription: "In this world, magic is a strong and powerful force, and we can shape it to suit our needs, which are as varied as the situations in which we find ourselves. Why should we limit ourselves by studying only healing or destructive magic when both can be so useful? By the same token, just because we are mages don't mean that we can't pick up a blade, especially when that weapon can be magically enhanced! As Red Mages, we offer all the potential of magic and a full range of spells, together with the freedom to decide how to use them- both inside and outside of combat. If you want to push the limits of being a mage- if you truly want to experience what life has to offer- then be a Red Mage, a true individualist!",
      image: "realRedmage.jfif"
    },
]

  export default jobsArray