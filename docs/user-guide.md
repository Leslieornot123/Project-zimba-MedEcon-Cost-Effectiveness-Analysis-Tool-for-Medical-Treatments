# MedEcon User Guide

## Table of Contents
1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Dashboard](#dashboard)
4. [Excel Import and Export](#excel-import-and-export)
5. [Creating a New Analysis](#creating-a-new-analysis)
6. [Understanding Results](#understanding-results)
7. [Saving and Exporting](#saving-and-exporting)
8. [Glossary](#glossary)
9. [FAQs](#faqs)

## Introduction

MedEcon is a cost-effectiveness analysis tool designed to help healthcare stakeholders evaluate both clinical efficacy and economic impact of emerging medical treatments. This guide provides detailed instructions on how to use the tool effectively.

### What is Cost-Effectiveness Analysis?

Cost-effectiveness analysis (CEA) is a form of economic analysis that compares the relative costs and outcomes (effects) of different courses of action. In healthcare, CEA typically measures the cost of an intervention against the health benefit it provides, expressed as quality-adjusted life years (QALYs) gained.

The primary metric for CEA is the Incremental Cost-Effectiveness Ratio (ICER), calculated as:

```
ICER = (Cost of New Treatment - Cost of Standard Treatment) / (QALYs from New Treatment - QALYs from Standard Treatment)
```

## Getting Started

### System Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- Internet connection (for loading external libraries)

### Accessing the Tool
1. Open the `index.html` file in your web browser
2. The dashboard will be the first screen you see

## Dashboard

The dashboard provides an overview of your cost-effectiveness analyses and quick access to key functions.

### Dashboard Components

1. **Navigation Bar**
   - Dashboard: Returns to the main dashboard view
   - Treatments: Will provide access to the treatment database (future feature)
   - Analysis: Will provide access to saved analyses (future feature)
   - Reports: Will provide access to generated reports (future feature)

2. **Recent Analyses**
   - List of recently conducted analyses with their ICER values
   - Green badges indicate cost-effective treatments
   - Yellow badges indicate potentially cost-effective treatments
   - Red badges indicate treatments that are not cost-effective

3. **Cost-Effectiveness Overview**
   - Scatter plot visualizing treatments by QALY gain (x-axis) and ICER value (y-axis)
   - Size of dots corresponds to the relative importance/impact of the treatment
   - Hover over dots to see detailed information

4. **Action Buttons**
   - "Import from Excel" button to load treatment data from an Excel file
   - "Download Template" button to download an Excel template for data entry
   - "New Analysis" button to start a new cost-effectiveness analysis manually

## Excel Import and Export

MedEcon provides functionality to import treatment data from Excel files and export analysis results back to Excel, making it easier to work with existing data and share your findings.

### Importing Treatment Data

1. **Download Template**
   - Click the "Download Template" button on the dashboard
   - This will download an Excel file with the correct format and sample data
   - The template includes detailed instructions on how to format your data
   - The template contains two sheets: "Treatment Data" and "Instructions"

2. **Prepare Your Data**
   - Open the template file in Excel
   - Enter your treatment data in the "Treatment Data" sheet
   - Maintain the original column headers
   - Each row represents a different treatment

3. **Import the Data**
   - Click the "Import from Excel" button on the dashboard
   - Select your completed Excel file in the file dialog
   - Click "Import Data" to process the file
   - The application will load the first treatment from the file into the analysis form
   - You can review and adjust the imported data before running the analysis

### Exporting Analysis Results

After running an analysis, you can export the complete results to Excel:

1. **Run an Analysis**
   - Complete the analysis form and click "Run Analysis"
   - Review the results displayed on the screen

2. **Export to Excel**
   - Click the "Export to Excel" button in the results section
   - This will generate and download an Excel file with three sheets:
     - **Input Data**: The treatment parameters you entered
     - **Results**: The key cost-effectiveness metrics (ICER, recommendation, etc.)
     - **Cost Breakdown**: Detailed breakdown of costs by category with percentages

3. **Using the Exported File**
   - The exported file maintains the same format as the import template
   - You can edit the input data and re-import it later
   - The results sheets provide data suitable for reports and presentations

## Creating a New Analysis

### Step 1: Basic Information
1. Click "New Analysis" on the dashboard
2. Enter the treatment name in the "Treatment Name" field
3. Select the comparator treatment from the dropdown menu

### Step 2: Clinical Efficacy Data
1. Enter the QALY gain associated with the new treatment
   - This is the incremental quality-adjusted life years gained compared to the standard treatment
   - Typically derived from clinical trials or published literature
   - Values typically range from 0.1 to 2.0 QALYs

2. Enter the success rate (%)
   - The percentage of patients for whom the treatment is successful
   - Typically derived from clinical trials

3. Enter the adverse event rate (%)
   - The percentage of patients experiencing significant adverse events
   - Used to calculate adverse event management costs

4. Enter the treatment duration (months)
   - The duration for which the treatment is administered
   - Impacts total treatment costs for time-dependent treatments

### Step 3: Economic Data
1. Enter the treatment cost ($)
   - The direct cost of the treatment (e.g., drug cost, device cost)
   - For drugs, this might be the per-dose cost multiplied by the number of doses

2. Enter the administration cost ($)
   - Costs associated with administering the treatment
   - Examples: Nursing time, facility usage, injection administration

3. Enter the monitoring cost ($)
   - Costs associated with monitoring the patient during treatment
   - Examples: Laboratory tests, imaging, clinical visits

4. Enter the adverse event management cost ($)
   - Average cost of managing a significant adverse event
   - This will be multiplied by the adverse event rate

### Step 4: Run the Analysis
1. Click "Run Analysis" to calculate the cost-effectiveness results
2. The system will automatically calculate the ICER and generate visualizations

## Understanding Results

### Cost-Effectiveness Summary
The summary table displays key results from your analysis:

1. **Treatment & Comparator**
   - Names of the treatments being compared

2. **Incremental Cost**
   - The additional cost of the new treatment compared to the standard treatment

3. **Incremental QALY**
   - The additional QALYs gained from the new treatment compared to the standard treatment

4. **ICER ($/QALY)**
   - The incremental cost-effectiveness ratio
   - Lower values indicate more cost-effective treatments
   - Common thresholds:
     - < $30,000/QALY: Highly cost-effective
     - $30,000-$100,000/QALY: Potentially cost-effective
     - > $100,000/QALY: Not cost-effective

5. **Recommendation**
   - Automatic recommendation based on ICER thresholds
   - Color-coded for quick interpretation (green, yellow, red)

### Sensitivity Analysis
The sensitivity analysis chart shows how the ICER changes when key parameters vary:

1. Each line represents a different cost variation (70% to 130% of base case)
2. The x-axis shows different QALY gain variations (70% to 130% of base case)
3. The y-axis shows the resulting ICER values
4. This helps identify which parameters have the most significant impact on cost-effectiveness

### Cost Breakdown
The doughnut chart shows the relative contribution of different cost components:
1. Treatment costs
2. Administration costs
3. Monitoring costs
4. Adverse event management costs

## Saving and Exporting

### Saving an Analysis
1. After reviewing the results, click "Save Analysis"
2. The analysis will be saved to your recent analyses list
3. In the current MVP, this is stored locally

### Exporting Results to Excel
1. After reviewing the results, click "Export to Excel"
2. The Excel file will include all input parameters, results, and cost breakdown
3. The file is automatically named based on the treatment being analyzed

### Exporting a PDF Report
1. Click "Export PDF Report" to generate a comprehensive report
2. The report includes all visualizations and the detailed analysis
3. In the current MVP, this generates an alert

### Editing an Analysis
1. Click "Edit Analysis" to return to the input form
2. All previously entered values will be preserved
3. Make your changes and click "Run Analysis" again

## Glossary

- **QALY (Quality-Adjusted Life Year)**: A measure of disease burden that considers both quantity and quality of life. One QALY equals one year in perfect health.

- **ICER (Incremental Cost-Effectiveness Ratio)**: The ratio of the change in costs to the change in effects. Lower values indicate more cost-effective treatments.

- **Comparator**: The standard treatment or current practice against which a new treatment is compared.

- **Sensitivity Analysis**: A technique used to determine how different values of an independent variable affect a dependent variable under a given set of assumptions.

- **Cost-Effectiveness Threshold**: The maximum amount a decision-maker is willing to pay for a unit of health outcome (usually per QALY gained).

## FAQs

**Q: How do I interpret the ICER value?**  
A: The ICER represents the additional cost required to gain one additional QALY. Lower values are better. Most healthcare systems consider treatments with ICERs below $30,000-$50,000 per QALY to be cost-effective.

**Q: Where should I get the QALY data from?**  
A: QALY data typically comes from clinical trials, published literature, or health economic models. For the most accurate analysis, use data specific to your patient population.

**Q: What if I don't know some of the cost values?**  
A: You can use estimates based on similar treatments or published literature. The sensitivity analysis will help you understand how variations in these estimates affect the final result.

**Q: Can I compare more than two treatments at once?**  
A: In the current MVP, you can only compare two treatments at a time. Future versions will support multiple treatment comparisons.

**Q: How do I account for different time horizons?**  
A: The current MVP uses a simplified model with direct costs. For more complex time horizon modeling, consider the treatment duration and adjust your QALY gain and costs accordingly.

**Q: Is the data I enter stored securely?**  
A: In the current MVP, data is stored locally in your browser. No data is sent to external servers. 