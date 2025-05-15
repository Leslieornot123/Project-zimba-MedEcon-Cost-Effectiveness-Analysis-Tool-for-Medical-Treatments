// MedEcon - Cost-Effectiveness Analysis Tool

// Test data for the application
const testData = {
    treatments: [
        {
            id: 1,
            name: "Novel Diabetes Type 2 Treatment",
            comparator: "Standard Care",
            qalyGain: 0.52,
            successRate: 85,
            adverseEventRate: 12,
            treatmentDuration: 12,
            treatmentCost: 9500,
            administrationCost: 1200,
            monitoringCost: 800,
            adverseEventCost: 1000,
            icer: 24038,
            recommendation: "Cost-Effective"
        },
        {
            id: 2,
            name: "Advanced Immunotherapy",
            comparator: "Chemotherapy",
            qalyGain: 1.1,
            successRate: 68,
            adverseEventRate: 24,
            treatmentDuration: 6,
            treatmentCost: 75000,
            administrationCost: 5500,
            monitoringCost: 3800,
            adverseEventCost: 1800,
            icer: 78300,
            recommendation: "Potentially Cost-Effective"
        },
        {
            id: 3,
            name: "New Hypertension Drug",
            comparator: "Current First-Line",
            qalyGain: 0.35,
            successRate: 92,
            adverseEventRate: 8,
            treatmentDuration: 36,
            treatmentCost: 3200,
            administrationCost: 500,
            monitoringCost: 600,
            adverseEventCost: 180,
            icer: 12800,
            recommendation: "Cost-Effective"
        }
    ],
    thresholds: {
        highlyEffective: 30000,
        potentiallyEffective: 100000
    }
};

// DOM elements
const newAnalysisBtn = document.getElementById('new-analysis-btn');
const analysisForm = document.getElementById('analysis-form');
const resultsSection = document.getElementById('results-section');
const cancelAnalysisBtn = document.getElementById('cancel-analysis');
const runAnalysisBtn = document.getElementById('run-analysis');
const backToFormBtn = document.getElementById('back-to-form');
const saveAnalysisBtn = document.getElementById('save-analysis');
const exportPdfBtn = document.getElementById('export-pdf');
const importDataBtn = document.getElementById('import-data-btn');
const exportTemplateBtn = document.getElementById('export-template-btn');
const exportExcelBtn = document.getElementById('export-excel');
const processExcelBtn = document.getElementById('process-excel-btn');
const excelFileInput = document.getElementById('excel-file-input');
const importStatusDiv = document.getElementById('import-status');

// Reference to the Bootstrap modal
let importModal;

// Current analysis data
let currentAnalysis = {};

// Chart instances
let ceChart;
let sensitivityChart;
let costBreakdownChart;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the dashboard chart
    initializeOverviewChart();
    
    // Set up event listeners
    newAnalysisBtn.addEventListener('click', showAnalysisForm);
    cancelAnalysisBtn.addEventListener('click', hideAnalysisForm);
    runAnalysisBtn.addEventListener('click', runAnalysis);
    backToFormBtn.addEventListener('click', showEditForm);
    saveAnalysisBtn.addEventListener('click', saveAnalysis);
    exportPdfBtn.addEventListener('click', exportPdf);
    importDataBtn.addEventListener('click', showImportModal);
    exportTemplateBtn.addEventListener('click', exportTemplate);
    exportExcelBtn.addEventListener('click', exportToExcel);
    processExcelBtn.addEventListener('click', processExcelFile);
    
    // Initialize Bootstrap modal
    importModal = new bootstrap.Modal(document.getElementById('import-modal'));
    
    // Prepopulate form with example data
    prepopulateForm();
});

// Initialize the cost-effectiveness overview chart
function initializeOverviewChart() {
    const ctx = document.getElementById('ce-chart').getContext('2d');
    
    ceChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Cost-Effective',
                data: [
                    { x: 0.52, y: 24038, r: 10 },
                    { x: 0.35, y: 12800, r: 8 }
                ],
                backgroundColor: 'rgba(40, 167, 69, 0.7)',
                borderColor: 'rgba(40, 167, 69, 1)',
                borderWidth: 1
            }, {
                label: 'Potentially Cost-Effective',
                data: [
                    { x: 1.1, y: 78300, r: 15 }
                ],
                backgroundColor: 'rgba(255, 193, 7, 0.7)',
                borderColor: 'rgba(255, 193, 7, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'QALY Gain'
                    },
                    min: 0
                },
                y: {
                    title: {
                        display: true,
                        text: 'ICER ($/QALY)'
                    },
                    min: 0
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const treatment = testData.treatments.find(t => 
                                t.qalyGain === context.parsed.x && 
                                t.icer === context.parsed.y);
                            
                            if (treatment) {
                                return [
                                    treatment.name + ' vs. ' + treatment.comparator,
                                    'QALY Gain: ' + treatment.qalyGain,
                                    'ICER: $' + treatment.icer + '/QALY'
                                ];
                            }
                            return '';
                        }
                    }
                }
            }
        }
    });
}

// Show the analysis form
function showAnalysisForm() {
    analysisForm.style.display = 'block';
    resultsSection.style.display = 'none';
}

// Hide the analysis form
function hideAnalysisForm() {
    analysisForm.style.display = 'none';
}

// Show edit form when returning from results
function showEditForm() {
    analysisForm.style.display = 'block';
    resultsSection.style.display = 'none';
}

// Prepopulate form with example data
function prepopulateForm() {
    document.getElementById('treatment-name').value = "New Biologic for Rheumatoid Arthritis";
    document.getElementById('comparator').value = "Standard of care";
    document.getElementById('qaly-gain').value = "0.8";
    document.getElementById('success-rate').value = "78";
    document.getElementById('adverse-rate').value = "15";
    document.getElementById('treatment-duration').value = "24";
    document.getElementById('treatment-cost').value = "28000";
    document.getElementById('admin-cost').value = "2500";
    document.getElementById('monitoring-cost').value = "1800";
    document.getElementById('adverse-cost').value = "1200";
}

// Populate form with imported data
function populateFormWithData(data) {
    document.getElementById('treatment-name').value = data.name || "";
    document.getElementById('comparator').value = data.comparator || "Standard of care";
    document.getElementById('qaly-gain').value = data.qalyGain || "";
    document.getElementById('success-rate').value = data.successRate || "";
    document.getElementById('adverse-rate').value = data.adverseEventRate || "";
    document.getElementById('treatment-duration').value = data.treatmentDuration || "";
    document.getElementById('treatment-cost').value = data.treatmentCost || "";
    document.getElementById('admin-cost').value = data.administrationCost || "";
    document.getElementById('monitoring-cost').value = data.monitoringCost || "";
    document.getElementById('adverse-cost').value = data.adverseEventCost || "";
}

// Run the cost-effectiveness analysis
function runAnalysis() {
    // Hide form and show results
    analysisForm.style.display = 'none';
    resultsSection.style.display = 'block';
    
    // Get form values
    const treatmentName = document.getElementById('treatment-name').value;
    const comparator = document.getElementById('comparator').value;
    const qalyGain = parseFloat(document.getElementById('qaly-gain').value);
    const successRate = parseFloat(document.getElementById('success-rate').value);
    const adverseRate = parseFloat(document.getElementById('adverse-rate').value);
    const treatmentDuration = parseInt(document.getElementById('treatment-duration').value);
    const treatmentCost = parseFloat(document.getElementById('treatment-cost').value);
    const adminCost = parseFloat(document.getElementById('admin-cost').value);
    const monitoringCost = parseFloat(document.getElementById('monitoring-cost').value);
    const adverseCost = parseFloat(document.getElementById('adverse-cost').value);
    
    // Calculate total costs
    const totalCost = treatmentCost + adminCost + monitoringCost + (adverseCost * adverseRate / 100);
    const comparatorCost = 5000; // Assumed baseline cost for comparator
    const incrementalCost = totalCost - comparatorCost;
    
    // Calculate ICER
    const icer = Math.round(incrementalCost / qalyGain);
    
    // Determine recommendation
    let recommendation, badgeClass;
    if (icer <= testData.thresholds.highlyEffective) {
        recommendation = "Cost-Effective";
        badgeClass = "bg-success";
    } else if (icer <= testData.thresholds.potentiallyEffective) {
        recommendation = "Potentially Cost-Effective";
        badgeClass = "bg-warning";
    } else {
        recommendation = "Not Cost-Effective";
        badgeClass = "bg-danger";
    }
    
    // Store current analysis data for export
    currentAnalysis = {
        name: treatmentName,
        comparator: comparator,
        qalyGain: qalyGain,
        successRate: successRate,
        adverseEventRate: adverseRate,
        treatmentDuration: treatmentDuration,
        treatmentCost: treatmentCost,
        administrationCost: adminCost,
        monitoringCost: monitoringCost,
        adverseEventCost: adverseCost,
        totalCost: totalCost,
        incrementalCost: incrementalCost,
        icer: icer,
        recommendation: recommendation
    };
    
    // Update results table
    document.getElementById('result-treatment').textContent = treatmentName;
    document.getElementById('result-comparator').textContent = comparator;
    document.getElementById('result-inc-cost').textContent = '$' + incrementalCost.toLocaleString();
    document.getElementById('result-inc-qaly').textContent = qalyGain.toFixed(2);
    document.getElementById('result-icer').textContent = '$' + icer.toLocaleString();
    document.getElementById('result-recommendation').innerHTML = 
        `<span class="badge ${badgeClass}">${recommendation}</span>`;
    
    // Generate charts
    generateSensitivityChart(qalyGain, incrementalCost);
    generateCostBreakdownChart(treatmentCost, adminCost, monitoringCost, adverseCost * adverseRate / 100);
}

// Generate sensitivity analysis chart
function generateSensitivityChart(qalyGain, incrementalCost) {
    const ctx = document.getElementById('sensitivity-chart').getContext('2d');
    
    // Calculate ICER variations
    const baseIcer = incrementalCost / qalyGain;
    const costVariations = [0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3];
    const qalyVariations = [0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3];
    
    // Create datasets
    const datasets = costVariations.map(costVar => {
        const modifiedCost = incrementalCost * costVar;
        return {
            label: `Cost ${(costVar*100).toFixed(0)}%`,
            data: qalyVariations.map(qalyVar => {
                const modifiedQaly = qalyGain * qalyVar;
                return Math.round(modifiedCost / modifiedQaly);
            }),
            borderColor: getColorForVariation(costVar),
            backgroundColor: 'transparent',
            tension: 0.1
        };
    });
    
    // Create chart
    if (sensitivityChart) sensitivityChart.destroy();
    sensitivityChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: qalyVariations.map(v => `QALY ${(v*100).toFixed(0)}%`),
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'ICER ($/QALY)'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 12
                    }
                }
            }
        }
    });
}

// Generate cost breakdown chart
function generateCostBreakdownChart(treatmentCost, adminCost, monitoringCost, adverseCost) {
    const ctx = document.getElementById('cost-breakdown-chart').getContext('2d');
    
    if (costBreakdownChart) costBreakdownChart.destroy();
    costBreakdownChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Treatment', 'Administration', 'Monitoring', 'Adverse Events'],
            datasets: [{
                data: [treatmentCost, adminCost, monitoringCost, adverseCost],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: $${value.toLocaleString()} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Helper function to get color for variation
function getColorForVariation(variation) {
    if (variation < 1) {
        return `rgba(54, 162, 235, ${0.4 + (variation - 0.7) * 1.5})`;
    } else {
        return `rgba(255, 99, 132, ${0.4 + (variation - 1) * 1.5})`;
    }
}

// Save analysis 
function saveAnalysis() {
    alert('Analysis saved successfully!');
    
    // In a real application, this would save the analysis to a database
    // For this demo, we just show an alert
}

// Export PDF report
function exportPdf() {
    alert('PDF report export initiated. Your report will download shortly.');
    
    // In a real application, this would generate a PDF
    // For this demo, we just show an alert
}

// Show the import modal
function showImportModal() {
    // Clear previous input
    excelFileInput.value = '';
    importStatusDiv.innerHTML = '';
    
    // Show the modal
    importModal.show();
}

// Export Excel template
function exportTemplate() {
    // Create a worksheet with sample data
    const ws = XLSX.utils.json_to_sheet([{
        "Treatment Name": "Example Treatment",
        "Comparator": "Standard of care",
        "QALY Gain": 0.5,
        "Success Rate (%)": 80,
        "Adverse Event Rate (%)": 15,
        "Treatment Duration (months)": 12,
        "Treatment Cost ($)": 10000,
        "Administration Cost ($)": 1000,
        "Monitoring Cost ($)": 800,
        "Adverse Event Cost ($)": 1200
    }]);
    
    // Set column widths
    const wscols = [
        {wch: 25}, // Treatment Name
        {wch: 20}, // Comparator
        {wch: 15}, // QALY Gain
        {wch: 15}, // Success Rate
        {wch: 20}, // Adverse Event Rate
        {wch: 25}, // Treatment Duration
        {wch: 18}, // Treatment Cost
        {wch: 22}, // Administration Cost
        {wch: 18}, // Monitoring Cost
        {wch: 22}  // Adverse Event Cost
    ];
    ws['!cols'] = wscols;
    
    // Create a workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Treatment Data");
    
    // Add an instructions sheet
    const instructionsWs = XLSX.utils.aoa_to_sheet([
        ["MedEcon - Treatment Data Template Instructions"],
        [""],
        ["This template is used to import treatment data into the MedEcon Cost-Effectiveness Analysis Tool."],
        [""],
        ["Instructions:"],
        ["1. Enter your treatment data in the 'Treatment Data' sheet."],
        ["2. Do not modify the column headers."],
        ["3. You can add multiple treatments by adding more rows."],
        ["4. Save the file as an Excel (.xlsx) file."],
        ["5. Import the file using the 'Import from Excel' button in the application."],
        [""],
        ["Field Descriptions:"],
        ["Treatment Name: Name of the new treatment being analyzed"],
        ["Comparator: Standard treatment used for comparison"],
        ["QALY Gain: Quality-adjusted life years gained (vs. comparator)"],
        ["Success Rate (%): Percentage of patients for whom treatment is successful"],
        ["Adverse Event Rate (%): Percentage of patients experiencing adverse events"],
        ["Treatment Duration (months): Length of treatment course"],
        ["Treatment Cost ($): Direct cost of the treatment"],
        ["Administration Cost ($): Costs associated with administering the treatment"],
        ["Monitoring Cost ($): Costs for monitoring during treatment"],
        ["Adverse Event Cost ($): Average cost of managing one adverse event"]
    ]);
    
    // Set column width for instructions
    instructionsWs['!cols'] = [{wch: 70}];
    
    XLSX.utils.book_append_sheet(wb, instructionsWs, "Instructions");
    
    // Export the file
    XLSX.writeFile(wb, "MedEcon_Treatment_Template.xlsx");
}

// Process the uploaded Excel file
function processExcelFile() {
    const file = excelFileInput.files[0];
    if (!file) {
        importStatusDiv.innerHTML = '<div class="alert alert-danger">Please select a file first.</div>';
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, {type: 'array'});
            
            // Get the first sheet
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            
            // Convert to JSON
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            
            if (jsonData.length === 0) {
                importStatusDiv.innerHTML = '<div class="alert alert-warning">No data found in the file.</div>';
                return;
            }
            
            // Get the first row of data
            const treatmentData = jsonData[0];
            
            // Map Excel columns to our data model
            const mappedData = {
                name: treatmentData["Treatment Name"],
                comparator: treatmentData["Comparator"],
                qalyGain: treatmentData["QALY Gain"],
                successRate: treatmentData["Success Rate (%)"],
                adverseEventRate: treatmentData["Adverse Event Rate (%)"],
                treatmentDuration: treatmentData["Treatment Duration (months)"],
                treatmentCost: treatmentData["Treatment Cost ($)"],
                administrationCost: treatmentData["Administration Cost ($)"],
                monitoringCost: treatmentData["Monitoring Cost ($)"],
                adverseEventCost: treatmentData["Adverse Event Cost ($)"]
            };
            
            // Close the modal
            importModal.hide();
            
            // Show the form and populate with imported data
            showAnalysisForm();
            populateFormWithData(mappedData);
            
        } catch (error) {
            importStatusDiv.innerHTML = `<div class="alert alert-danger">Error processing file: ${error.message}</div>`;
        }
    };
    
    reader.onerror = function() {
        importStatusDiv.innerHTML = '<div class="alert alert-danger">Error reading file.</div>';
    };
    
    reader.readAsArrayBuffer(file);
}

// Export current analysis to Excel
function exportToExcel() {
    if (!currentAnalysis.name) {
        alert('No analysis data available to export. Please run an analysis first.');
        return;
    }
    
    // Create input data worksheet
    const inputData = [{
        "Treatment Name": currentAnalysis.name,
        "Comparator": currentAnalysis.comparator,
        "QALY Gain": currentAnalysis.qalyGain,
        "Success Rate (%)": currentAnalysis.successRate,
        "Adverse Event Rate (%)": currentAnalysis.adverseEventRate,
        "Treatment Duration (months)": currentAnalysis.treatmentDuration,
        "Treatment Cost ($)": currentAnalysis.treatmentCost,
        "Administration Cost ($)": currentAnalysis.administrationCost,
        "Monitoring Cost ($)": currentAnalysis.monitoringCost,
        "Adverse Event Cost ($)": currentAnalysis.adverseEventCost
    }];
    
    const inputWs = XLSX.utils.json_to_sheet(inputData);
    
    // Create results worksheet
    const resultsData = [{
        "Treatment": currentAnalysis.name,
        "Comparator": currentAnalysis.comparator,
        "Incremental Cost ($)": currentAnalysis.incrementalCost,
        "Incremental QALY": currentAnalysis.qalyGain,
        "ICER ($/QALY)": currentAnalysis.icer,
        "Recommendation": currentAnalysis.recommendation
    }];
    
    const resultsWs = XLSX.utils.json_to_sheet(resultsData);
    
    // Create cost breakdown worksheet
    const costData = [{
        "Category": "Treatment",
        "Cost ($)": currentAnalysis.treatmentCost,
        "Percentage (%)": (currentAnalysis.treatmentCost / currentAnalysis.totalCost * 100).toFixed(1)
    }, {
        "Category": "Administration",
        "Cost ($)": currentAnalysis.administrationCost,
        "Percentage (%)": (currentAnalysis.administrationCost / currentAnalysis.totalCost * 100).toFixed(1)
    }, {
        "Category": "Monitoring",
        "Cost ($)": currentAnalysis.monitoringCost,
        "Percentage (%)": (currentAnalysis.monitoringCost / currentAnalysis.totalCost * 100).toFixed(1)
    }, {
        "Category": "Adverse Events",
        "Cost ($)": (currentAnalysis.adverseEventCost * currentAnalysis.adverseEventRate / 100),
        "Percentage (%)": (currentAnalysis.adverseEventCost * currentAnalysis.adverseEventRate / 100 / currentAnalysis.totalCost * 100).toFixed(1)
    }];
    
    const costWs = XLSX.utils.json_to_sheet(costData);
    
    // Create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, inputWs, "Input Data");
    XLSX.utils.book_append_sheet(wb, resultsWs, "Results");
    XLSX.utils.book_append_sheet(wb, costWs, "Cost Breakdown");
    
    // Export the file
    const fileName = `${currentAnalysis.name.replace(/\s+/g, '_')}_Analysis.xlsx`;
    XLSX.writeFile(wb, fileName);
} 