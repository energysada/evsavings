# EV Savings Calculator — Methodology

## Overview
This calculator helps consumers compare the cost of driving an EV vs a gas vehicle across all 50 US states. It covers fuel costs, maintenance costs, e-gallon equivalents, and range/trips analysis.

---

## 1. E-Gallon Calculation

The "e-gallon" is the cost of charging an EV to drive the same distance as one gallon of gasoline.

### Formula
```
e-gallon = (electricity price per kWh) × (EV kWh/100mi) / (gas car gal/100mi)
```

Simplified:
```
e-gallon = (electricity ¢/kWh / 100) × (evEff / gasEff)
```

Where:
- `evEff` = 27 kWh/100mi (2025 Hyundai Kona Electric, EPA rated)
- `gasEff` = 3.2 gal/100mi (2025 Hyundai Kona gas, EPA rated)
- `kwhPerGallonEquiv` = 27 / 3.2 = **8.4375 kWh**

This means to drive the same distance that 1 gallon takes a gas Kona (31.25 miles), the Kona Electric needs 8.4375 kWh.

### Example (California)
- Electricity: 31.91 ¢/kWh
- e-gallon = (31.91/100) × 8.4375 = **$2.69**
- Gas price: $5.93/gal
- Savings: $3.24 per gallon equivalent (55% cheaper)

### Data source alignment
Yale Climate Connections calculates the same metric using the same formula and gets $2.72 for California (Jan 2026 data). Our slight difference ($2.69 vs $2.72) is because we use slightly different electricity price snapshots. The DOE publishes the official eGallon methodology at energy.gov.

### Reference
- [Yale Climate Connections: What's cheaper — gas or electricity?](https://yaleclimateconnections.org/2024/01/gasoline-is-cheap-right-now-but-charging-an-ev-is-still-cheaper/)
- [Yale Climate Connections: April 2026 update](https://yaleclimateconnections.org/2026/04/whats-cheaper-fueling-your-car-with-gas-or-electricity/)
- [DOE eGallon methodology](https://www.energy.gov/articles/egallon-how-much-cheaper-it-drive-electricity)

---

## 2. Fuel Cost Comparison (Per-Vehicle)

### Formula
```
EV cost per mile = (electricity ¢/kWh / 100) × (EV kWh/100mi) / 100
Gas cost per mile = gas $/gal × (gas gal/100mi) / 100
Annual cost = cost per mile × annual miles
Savings = gas annual cost - EV annual cost
```

### City/Highway Adjustment
EPA combined ratings assume 55% city / 45% highway driving. We apply adjustment factors when the user changes the driving habits slider:

```
Gas adjustment = cityPct × 1.25 + hwyPct × 0.78
EV adjustment  = cityPct × 0.88 + hwyPct × 1.13
```

- Gas cars use ~25% more fuel in city (stop-and-go, idling)
- EVs use ~12% less energy in city (regenerative braking recovers energy)
- At 55/45 split, both factors normalize to ~1.0

### Data Sources
- **Gas prices**: AAA state-level averages, updated April 7, 2026 ($4.12 national avg)
- **Electricity rates**: EIA state-level residential prices (cents/kWh)
- **Vehicle efficiency**: EPA fuel economy ratings from FuelEconomy.gov

---

## 3. Matched Pair Comparisons (Segment × Price Matrix)

### Methodology
Each cell in the matrix shows a matched EV-vs-gas pair within the same vehicle segment and price tier.

### Segments (Y-axis)
- Sedans (compact/midsize)
- Small SUVs (compact crossovers)
- Large SUVs (midsize+)
- Pickups (full-size trucks)

### Price Tiers (X-axis)
Based on EV MSRP:
- Under $35k (Bolt EV, Kona Electric, Equinox EV)
- $35–50k (Model 3, Model Y, Mach-E, Ioniq 6)
- $50–75k (i4, G80, EV9, LYRIQ, Lightning, Silverado EV)
- $75k+ (Model S, Lucid Air, EQS, iX, R1S, R1T, Sierra EV)

### Brand Matrix ("I Drive a...")
Anchored on the most popular ICE models per brand. Shows what EV a buyer should switch to.
Brands: Toyota, Honda, Ford, Chevrolet, Hyundai/Kia, Nissan, Volkswagen, BMW, Mercedes.

### Time Period Toggle
Users can view savings over 1 year, 5 years, or 10 years.

---

## 4. Maintenance Cost Comparison

### Methodology
Base costs for a mainstream sedan, scaled by segment multiplier.

### Segment Multipliers (vs sedan baseline)
- Sedan: 1.0×
- SUV: 1.15×
- Pickup: 1.30×
- Luxury: 1.45×

### Gas Vehicle Maintenance Items
| Item | Cost/Service | Frequency |
|------|-------------|-----------|
| Oil & filter change | $75 | Every 5,000 mi |
| Air filter | $50 | Every 20,000 mi |
| Spark plugs | $200 | Every 60,000 mi |
| Transmission fluid | $250 | Every 60,000 mi |
| Brake pads & rotors | $400 | Every 40,000 mi |
| Coolant flush | $120 | Every 30,000 mi |
| Belt replacement | $180 | Every 60,000 mi |
| Exhaust system | $300 | Every 80,000 mi |
| Tire rotation | $40 | Every 7,500 mi |
| Wiper blades | $30 | Every 15,000 mi |

### EV Maintenance Items
| Item | Cost/Service | Frequency | Notes |
|------|-------------|-----------|-------|
| Oil & filter | $0 | N/A | Not needed |
| Cabin air filter | $40 | Every 20,000 mi | |
| Spark plugs | $0 | N/A | Not needed |
| Transmission fluid | $0 | N/A | Not needed |
| Brake pads & rotors | $400 | Every 80,000 mi | 2× longer life due to regen braking |
| Battery coolant | $150 | Every 50,000 mi | |
| Belt replacement | $0 | N/A | Not needed |
| Exhaust system | $0 | N/A | Not needed |
| Tire rotation | $40 | Every 7,500 mi | |
| Wiper blades | $30 | Every 15,000 mi | |

### City/Highway Effect on Brakes
Gas car brake frequency is adjusted by city driving percentage (more city = more braking). EV brakes are unaffected (regen braking handles most deceleration).

### Sources
- AAA "Your Driving Costs" annual report
- Consumer Reports maintenance cost data

---

## 5. Trips Per Charge

### Methodology
Shows how many round trips an EV can make on a single charge.

```
Adjusted range = EPA range × (1 / evAdj)
Trips = floor(adjusted range / trip distance)
```

Where `evAdj` is the city/highway efficiency factor (EVs get more range in city due to regen).

### Vehicle Selection
Automatically picks the highest-range EV from each segment, then second-highest from a different brand:
- Row 1: Best range per segment
- Row 2: Best range per segment, different brand

### EPA Range Data
All 42 EVs in the database have EPA range data (miles per full charge).

---

## 6. Deep Dive Calculator (Currently Hidden)

### What it does
Users pick any specific EV and gas vehicle from dropdowns. Shows:
- Per-mile, monthly, annual, and 10-year savings
- Cumulative fuel cost chart over 10 years (Chart.js line chart)
- Detailed breakdown table (efficiency, cost per kWh/gallon, cost per 100mi, etc.)

### Why hidden
The segment/brand matrices provide the same comparison in a more accessible format. The deep dive is kept in the code (display:none) for potential future use or power users.

---

## 7. US Savings Map (Removed)

### What it did
D3.js choropleth map showing annual fuel savings (%) by state for the selected EV vs gas pair. Color-coded: dark green (60%+), medium green (40-60%), light green (20-40%), gray (no savings).

### Why removed
Replaced by the e-gallon map which is more intuitive — shows a dollar amount per state rather than a percentage.

---

## 8. $8.4 Billion Stat

### Source
Joint Economic Committee (Democratic minority) analysis, reported by CBS News April 3, 2026.

### Their methodology
- Used AAA daily gas prices from Feb 28 – March 31, 2026
- Combined with Edmunds data on tank sizes of top-selling gas vehicles
- Federal fuel consumption data from FHWA and EIA
- Calculated incremental cost vs pre-war baseline

### Our use
We display this as a static stat in "Why Drivers Are Switching." To make it dynamic/daily, we would need:
- Daily AAA national average gas price
- Pre-war baseline price ($2.96/gal on Feb 28)
- Daily US fuel consumption (~390M gallons/day from EIA)
- Formula: daily extra cost = (current price - baseline) × daily consumption
- Cumulative sum from Feb 28 to today

### Reference
- [CBS News: Higher gas prices cost $8.4 billion](https://www.cbsnews.com/news/gas-prices-iran-war-8-4-billion-increased-costs/)

---

## 9. Break-Even / Payback Analysis

### External Reference
[Recharged: When Does an EV Break Even vs Gas Car?](https://recharged.com/articles/when-does-ev-break-even-vs-gas-car)

### Their findings (at $2.90/gal gas, 2025 data)
| Scenario | Price Premium | Annual Savings | Break-Even |
|----------|--------------|----------------|-----------|
| Average commuter (10k mi/yr) | $5,000 | $700–$900 | 5–7 years |
| High-mileage driver (18k mi/yr) | $7,000 | $1,500–$2,000 | 3–5 years |
| Used EV vs new gas car (8k mi/yr) | ~$2,000 | $600–$800 | 2–4 years |

### Our validation (at current $4.12/gal gas, April 2026)
At today's gas prices, the break-even is significantly faster than Recharged's estimates because:
- Their gas price ($2.90/gal) is 30% below current national average ($4.12)
- At $4.12/gal, fuel savings alone are ~$1,100-1,500/yr for a typical commuter
- Adding maintenance savings (~$350/yr for sedans), total savings are $1,400-1,800/yr
- Break-even at $5k premium: **2.8-3.6 years** (vs their 5-7 years)

### Their maintenance data (validates ours)
- Gas cars: $7,000–$9,000 over 8 years → ~$875-1,125/yr
- EVs: $3,000–$5,000 over 8 years → ~$375-625/yr
- Gap: ~$350-500/yr
- Our calculator: sedan gas ~$810/yr, sedan EV ~$260/yr, gap ~$550/yr — slightly higher because we include more line items

### Key insight
Recharged's analysis uses pre-crisis gas prices. At current crisis-level prices ($4.12+ national avg), EVs break even roughly **twice as fast** as their published estimates suggest.

### Stat displayed on site
"4–8 yrs" payback period (from Recharged), linked to their article. This is the conservative estimate — at current gas prices, the real payback is closer to 3–5 years.

---

## 10. General Assumptions

1. **80% home charging** — most EV owners charge at home overnight using residential electricity rates
2. **Fuel and maintenance only** — does not include vehicle purchase price, insurance, tax credits, or depreciation
3. **EPA combined ratings** as baseline — adjusted by user's city/highway split
4. **Same-segment comparisons** — EV vs gas pairs are matched by vehicle size/type
5. **No time-of-use pricing** — uses flat residential electricity rates (actual costs may be lower with off-peak charging)
6. **Federal tax credit discontinued** — the $7,500 EV tax credit ended; not factored into calculations

---

## 11. Data Update Schedule

| Data | Source | Update Frequency |
|------|--------|-----------------|
| Gas prices | AAA state averages | Manual, ~weekly |
| Electricity rates | EIA residential rates | Manual, ~quarterly |
| Vehicle efficiency | EPA FuelEconomy.gov | Annual (new model years) |
| EPA range data | Manufacturer specs | Annual |
| Maintenance costs | AAA / Consumer Reports | Annual |
| E-gallon | Calculated from above | Automatic (formula-based) |
