# Content validation and assumptions

## Supplied reference values

The KPI values, component descriptions/specifications, six cycle windows, selected stage telemetry, furnace tilts, emissions comparison defaults and ranges, technology ratings/badges/descriptions, and chemical equations come from the supplied TSX reference. Annual production defaults to 2.0 million tonnes/year. The reference specifies 4.6 tonnes CO₂ per passenger vehicle annually for the illustrative equivalence.

## Calculated values

Annual emissions are production (million tonnes/year) multiplied by intensity (tonnes CO₂/tonne steel), yielding million tonnes CO₂/year. Avoided emissions are the BF-BOF result minus the EAF result. Reduction percentage is calculated from the two intensities. Passenger vehicles are estimated by converting avoided million tonnes to tonnes and dividing by the reference’s 4.6 tonnes/vehicle-year.

## Engineering assumptions and claims to review

- The cycle’s 0–90 minute stage windows and per-stage telemetry are representative illustrations; actual practice varies with furnace size, charge mix, power supply, operating practice, and plant conditions.
- Stage temperatures and electrical power are labeled as demonstration values, not sensor measurements. The selected values should not be interpreted as continuous measurements or precise stage averages.
- The EAF and BF-BOF carbon intensities depend on system boundary, grid mix, metallic charge, yield, and allocation. The interface does not define a common life-cycle boundary, so comparisons are indicative rather than universally comparable.
- The induction-furnace matrix makes broad claims about phosphorus and sulfur removal. Capability depends on furnace configuration, slag practice, feed quality, and downstream refining; avoid treating the wording as absolute.
- Statements about relative capital cost, scale, and refining performance are supplied reference claims and are not independently verified for a particular region, plant, or year.
- Vehicle equivalence is a communication aid based on the supplied factor, not a project-specific emissions inventory.
- Reference values and claims have not been independently verified in this implementation. The Gemini visual reference was inaccessible, so visual comparison against it was not possible.

## Chemical notation

The source includes reactions such as `C + ½O₂ → CO` and `Si + O₂ → SiO₂`. These are illustrative reaction summaries; the dashboard is not a complete thermodynamic or mass-balance model.
