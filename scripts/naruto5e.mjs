/**
 * Naruto 5e Module for Foundry VTT
 * Converts the D&D 5e system to support the Naruto 5e homebrew ruleset.
 * Includes clans, jutsu, classes, and ninja-themed mechanics.
 */

// Module Constants
const MODULE_ID = 'naruto5e';

/**
 * Chakra resource configuration for the Naruto 5e system
 * Replaces traditional spell slots with chakra points
 */
const CHAKRA_CONFIG = {
  resource: {
    label: "Chakra",
    abbreviation: "CP"
  }
};

/**
 * Jutsu rank configuration
 * Maps jutsu ranks to their equivalent spell levels and chakra costs
 */
const JUTSU_RANKS = {
  "e": { label: "E-Rank", level: 0, chakraCost: 0 },
  "d": { label: "D-Rank", level: 1, chakraCost: 2 },
  "c": { label: "C-Rank", level: 2, chakraCost: 3 },
  "b": { label: "B-Rank", level: 3, chakraCost: 5 },
  "a": { label: "A-Rank", level: 4, chakraCost: 6 },
  "s": { label: "S-Rank", level: 5, chakraCost: 7 }
};

/**
 * Chakra nature types
 */
const CHAKRA_NATURES = {
  "fire": { label: "Fire Release (Katon)", icon: "icons/magic/fire/flame-burning-hand-red.webp" },
  "water": { label: "Water Release (Suiton)", icon: "icons/magic/water/wave-water-blue.webp" },
  "wind": { label: "Wind Release (Futon)", icon: "icons/magic/air/wind-swirl-gray.webp" },
  "earth": { label: "Earth Release (Doton)", icon: "icons/magic/earth/rock-boulder-brown.webp" },
  "lightning": { label: "Lightning Release (Raiton)", icon: "icons/magic/lightning/bolt-strike-blue.webp" },
  "yin": { label: "Yin Release (Inton)", icon: "icons/magic/unholy/silhouette-evil-horned-giant.webp" },
  "yang": { label: "Yang Release (Yoton)", icon: "icons/magic/holy/angel-winged-humanoid-yellow.webp" }
};

/**
 * Hook that runs when Foundry is initialized
 */
Hooks.once('init', async function() {
  console.log(`${MODULE_ID} | Initializing Naruto 5e Module`);

  // Register module settings
  registerSettings();

  // Add custom config options to the dnd5e system
  CONFIG.DND5E.naruto5e = {
    chakraNatures: CHAKRA_NATURES,
    jutsuRanks: JUTSU_RANKS,
    chakra: CHAKRA_CONFIG
  };

  // Register custom Handlebars helpers
  registerHandlebarsHelpers();

  console.log(`${MODULE_ID} | Naruto 5e Module Initialized`);
});

/**
 * Hook that runs when Foundry is ready
 */
Hooks.once('ready', async function() {
  console.log(`${MODULE_ID} | Naruto 5e Module Ready`);

  // Display welcome message on first load
  if (game.user.isGM) {
    const hasShownWelcome = game.settings.get(MODULE_ID, 'hasShownWelcome');
    if (!hasShownWelcome) {
      showWelcomeDialog();
      game.settings.set(MODULE_ID, 'hasShownWelcome', true);
    }
  }
});

/**
 * Register module settings
 */
function registerSettings() {
  game.settings.register(MODULE_ID, 'hasShownWelcome', {
    name: 'Has Shown Welcome',
    scope: 'world',
    config: false,
    type: Boolean,
    default: false
  });

  game.settings.register(MODULE_ID, 'useChakraSystem', {
    name: 'NARUTO5E.SettingUseChakra',
    hint: 'NARUTO5E.SettingUseChakraHint',
    scope: 'world',
    config: true,
    type: Boolean,
    default: true
  });

  game.settings.register(MODULE_ID, 'chakraRecoveryRate', {
    name: 'NARUTO5E.SettingChakraRecovery',
    hint: 'NARUTO5E.SettingChakraRecoveryHint',
    scope: 'world',
    config: true,
    type: String,
    choices: {
      'short': 'NARUTO5E.RecoveryShort',
      'long': 'NARUTO5E.RecoveryLong'
    },
    default: 'long'
  });
}

/**
 * Register custom Handlebars helpers
 */
function registerHandlebarsHelpers() {
  Handlebars.registerHelper('jutsuRank', function(rank) {
    return JUTSU_RANKS[rank]?.label || rank;
  });

  Handlebars.registerHelper('chakraNature', function(nature) {
    return CHAKRA_NATURES[nature]?.label || nature;
  });
}

/**
 * Display welcome dialog to GM
 */
function showWelcomeDialog() {
  new Dialog({
    title: game.i18n.localize('NARUTO5E.WelcomeTitle'),
    content: `
      <div class="naruto5e-welcome">
        <h2>${game.i18n.localize('NARUTO5E.WelcomeHeader')}</h2>
        <p>${game.i18n.localize('NARUTO5E.WelcomeMessage')}</p>
        <ul>
          <li><strong>${game.i18n.localize('NARUTO5E.WelcomeFeature1')}</strong></li>
          <li><strong>${game.i18n.localize('NARUTO5E.WelcomeFeature2')}</strong></li>
          <li><strong>${game.i18n.localize('NARUTO5E.WelcomeFeature3')}</strong></li>
          <li><strong>${game.i18n.localize('NARUTO5E.WelcomeFeature4')}</strong></li>
        </ul>
      </div>
    `,
    buttons: {
      ok: {
        icon: '<i class="fas fa-check"></i>',
        label: game.i18n.localize('NARUTO5E.WelcomeButton')
      }
    },
    default: 'ok'
  }).render(true);
}

/**
 * Hook to modify actor sheets
 * Adds chakra display and ninja-specific UI elements
 */
Hooks.on('renderActorSheet', (app, html, data) => {
  if (!game.settings.get(MODULE_ID, 'useChakraSystem')) return;

  const actor = app.actor;
  if (actor.type !== 'character') return;

  // Add chakra-themed styling
  html.find('.sheet-header').addClass('naruto5e-header');
});

/**
 * Hook to modify item sheets
 * Adds jutsu-specific fields for spell items
 */
Hooks.on('renderItemSheet', (app, html, data) => {
  const item = app.item;

  // Check if this is a spell/jutsu item
  if (item.type === 'spell') {
    // Add jutsu rank selector if not present
    const spellDetails = html.find('.spell-details');
    if (spellDetails.length) {
      spellDetails.addClass('jutsu-details');
    }
  }
});

// Export for external use
export {
  MODULE_ID,
  CHAKRA_CONFIG,
  JUTSU_RANKS,
  CHAKRA_NATURES
};
