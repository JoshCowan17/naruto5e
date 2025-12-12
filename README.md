# Naruto 5e Module for Foundry VTT

A Foundry VTT module that converts the D&D 5e system to support the Naruto 5e homebrew ruleset. Includes clans, jutsu, classes, and ninja-themed mechanics.

## Features

- **Jutsu Compendiums**: Organized by rank (E-Rank through S-Rank)
- **Clan System**: Clans with unique abilities and kekkei genkai
- **Ninja Tools**: Equipment and consumables for ninja characters
- **Chakra System**: Optional chakra point system to replace spell slots
- **Ninja-themed UI**: Custom styling for character sheets and items

## Requirements

- Foundry VTT v13 or higher
- D&D 5e System v4.0.0 or higher

## Installation

### Manual Installation

1. Download the latest release
2. Extract to your Foundry VTT `Data/modules/` directory
3. Enable the module in your world

### Manifest URL

```
https://github.com/[your-username]/naruto5e-module/releases/latest/download/module.json
```

## Module Structure

```
naruto5e/
├── module.json          # Module manifest
├── scripts/
│   └── naruto5e.mjs     # Main module script
├── styles/
│   └── naruto5e.css     # Module styling
├── lang/
│   └── en.json          # English translations
└── packs/
    ├── jutsu-e-rank/    # E-Rank jutsu
    ├── jutsu-d-rank/    # D-Rank jutsu
    ├── jutsu-c-rank/    # C-Rank jutsu
    ├── jutsu-b-rank/    # B-Rank jutsu
    ├── jutsu-a-rank/    # A-Rank jutsu
    ├── jutsu-s-rank/    # S-Rank jutsu
    ├── clans/           # Clan items
    ├── class-features/  # Class feature items
    ├── clan-features/   # Clan feature items
    └── ninja-tools/     # Ninja tools & equipment
```

## Jutsu Ranks

| Rank | Equivalent Level | Chakra Cost |
|------|------------------|-------------|
| E-Rank | Cantrip (0) | 0 |
| D-Rank | 1st Level | 2 |
| C-Rank | 2nd Level | 3 |
| B-Rank | 3rd Level | 5 |
| A-Rank | 4th Level | 6 |
| S-Rank | 5th Level | 7 |

## Chakra Natures

- Fire Release (Katon)
- Water Release (Suiton)
- Wind Release (Futon)
- Earth Release (Doton)
- Lightning Release (Raiton)
- Yin Release (Inton)
- Yang Release (Yoton)

## Configuration

The module includes the following settings (found in Module Settings):

- **Use Chakra System**: Toggle the chakra point system on/off
- **Chakra Recovery**: Set when chakra recovers (Short Rest or Long Rest)

## License

This is a fan-made module for personal use. Naruto is a trademark of Masashi Kishimoto and Shueisha.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.
