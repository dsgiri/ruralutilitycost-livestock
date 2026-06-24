# Livestock Calculator Blueprints

This document defines the exact inputs, formulas, and outputs for every livestock tool in the Rural Utility Cost ecosystem. Currently, all tools share a generic template. We will use this blueprint to rebuild them one by one, giving each calculator its own bespoke logic, inputs, and charts.

## 1. Cattle Age Estimator
* **Description**: Estimates cattle age based on weight, breed, and optionally dentition (teeth).
* **Inputs**:
  - Current Weight (lbs)
  - Breed Frame Size (Small, Medium, Large)
  - Sex (Heifer, Steer, Bull)
  - *Optional*: Dentition stage (e.g., Temporary teeth, 2 permanent, 4 permanent)
* **Logic/Formulas**:
  - If Dentition is provided, map strictly to age bounds (e.g., 2 permanent teeth = 18-24 months).
  - If Dentition is not provided, use standard growth curve reverse calculation: `Age (days) = (Current Weight - Birth Weight) / Average Daily Gain (ADG)`.
  - Assume default birth weight (e.g., 80 lbs) and default ADG (e.g., 2.0 lbs/day) based on Breed Frame.
* **Outputs**:
  - Estimated Age (Months/Days).
  - Confidence range (e.g., ± 2 months).

## 2. Cattle Growth Tracker
* **Description**: Tracks and projects weight gain over time for beef cattle.
* **Inputs**:
  - Starting Weight (lbs)
  - Target/Finishing Weight (lbs)
  - Average Daily Gain (ADG) expected (lbs/day)
  - Start Date
* **Logic/Formulas**:
  - `Total Gain Required = Target Weight - Starting Weight`
  - `Days to Finish = Total Gain Required / ADG`
  - `Estimated Finish Date = Start Date + Days to Finish`
* **Outputs**:
  - Estimated Finish Date.
  - Total days on feed.
  - Interactive chart showing projected weight over time (Start Date to Finish Date).

## 3. Herd Feed Requirement Calculator
* **Description**: Calculates daily and monthly feed needs based on herd size and type.
* **Inputs**:
  - Number of Animals
  - Average Animal Weight (lbs)
  - Percentage of Body Weight consumed daily (default ~2.5% for dry matter)
  - Feed Waste Percentage (default 10%)
* **Logic/Formulas**:
  - `Dry Matter Intake (DMI) per animal = Average Weight * (Percentage / 100)`
  - `Total Daily Herd DMI = DMI per animal * Number of Animals`
  - `Total Feed Needed (incorporating waste) = Total Daily Herd DMI / (1 - (Waste Percentage / 100))`
  - Monthly needs = Daily * 30.
* **Outputs**:
  - Daily Feed Requirement (lbs).
  - Monthly Feed Requirement (lbs/tons).

## 4. Breeding Schedule Planner
* **Description**: Plans breeding cycles and gestation periods for various livestock.
* **Inputs**:
  - Animal Type (Cattle, Sheep, Goat, Pig)
  - Desired Birth/Calving Date OR Insemination Date
* **Logic/Formulas**:
  - Map Gestation lengths: Cattle (~283 days), Sheep (~150 days), Goats (~150 days), Pigs (~114 days).
  - If Desired Birth Date provided: `Breeding Date = Birth Date - Gestation Length`.
  - If Breeding Date provided: `Birth Date = Breeding Date + Gestation Length`.
  - Add Weaning Date estimate (e.g., Birth + 205 days for cattle).
* **Outputs**:
  - Breeding/Insemination Date.
  - Expected Birth Date.
  - Expected Weaning Date.

## 5. Calving Interval Planner
* **Description**: Optimizes breeding and calving intervals to maximize herd productivity (aiming for a 365-day interval).
* **Inputs**:
  - Last Calving Date
  - Desired Calving Interval (e.g., 365 days)
  - Gestation Length (default 283 days)
* **Logic/Formulas**:
  - `Target Next Calving Date = Last Calving Date + Desired Calving Interval`
  - `Target Rebreeding Date = Target Next Calving Date - Gestation Length`
  - `Postpartum Recovery Days (Days Open) = Target Rebreeding Date - Last Calving Date`
* **Outputs**:
  - Target Rebreeding Date & Target Next Calving Date.
  - Days Open (alert if < 45 days as it's biologically difficult).

## 6. Livestock Weight Projection
* **Description**: Predicts future weights based on current growth rates.
* **Inputs**:
  - Current Weight
  - Target Date
  - Expected ADG (Average Daily Gain)
* **Logic/Formulas**:
  - `Days = Target Date - Current Date`
  - `Weight Gain = Days * ADG`
  - `Projected Final Weight = Current Weight + Weight Gain`
* **Outputs**:
  - Projected Weight on Target Date.
  - Total Weight Gained.
  - Line chart extending from today to the Target Date.

## 7. Goat / Sheep Feed Planner
* **Description**: Estimates forage and supplement needs for small ruminants.
* **Inputs**:
  - Number of Animals
  - Average Weight (lbs)
  - Production Stage (Maintenance, Late Gestation, Lactating)
* **Logic/Formulas**:
  - Intake % of body weight changes by stage: Maintenance (~2%), Late Gestation (~3%), Lactation (~4%).
  - `Daily DMI per animal = Average Weight * Intake %`
  - `Total Daily DMI = Daily DMI * Number of Animals`
* **Outputs**:
  - Daily Dry Matter Requirement.
  - Weekly/Monthly requirements.

## 8. Poultry Flock Growth Overview
* **Description**: Tracks daily weight and feed conversion for broiler flocks.
* **Inputs**:
  - Flock Size (Number of birds)
  - Target Harvest Weight (lbs/bird)
  - Expected Feed Conversion Ratio (FCR) (e.g., 1.5 - 1.8)
  - Mortality Rate Assumption (%)
* **Logic/Formulas**:
  - `Harvest Flock Size = Flock Size * (1 - Mortality Rate)`
  - `Total Final Weight = Harvest Flock Size * Target Harvest Weight`
  - `Total Feed Required = Total Final Weight * FCR`
* **Outputs**:
  - Estimated Total Feed needed for the cycle.
  - Expected Harvest Headcount.
  - Total Expected Meat Yield (live weight).
