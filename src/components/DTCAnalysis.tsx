import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, Wrench, IndianRupee, Clock, Info } from 'lucide-react';
import { CarHealthAnalyzer, type OBDData } from "@/lib/carHealthAnalyzer";

interface DTCAnalysisProps {
  obdData: OBDData;
}

export function DTCAnalysis({ obdData }: DTCAnalysisProps) {
  const { dtcs, status } = obdData;

  const getSeverityColor = (severity: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      default: return 'outline';
    }
  };

  const getSeverityIcon = (severity: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'high': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'medium': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default: return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* DTC Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {status.mil ? (
              <AlertTriangle className="w-5 h-5 text-red-500" />
            ) : (
              <CheckCircle className="w-5 h-5 text-green-500" />
            )}
            Diagnostic Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-2 ${
                status.mil ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
              }`}>
                {status.mil ? (
                  <AlertTriangle className="w-6 h-6" />
                ) : (
                  <CheckCircle className="w-6 h-6" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">Malfunction Indicator</p>
              <p className="text-lg font-bold">{status.mil ? 'ON' : 'OFF'}</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-2">
                <span className="text-lg font-bold">{dtcs.length}</span>
              </div>
              <p className="text-sm text-muted-foreground">Active DTCs</p>
              <p className="text-lg font-bold">{dtcs.length} Codes</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-purple-600 mb-2">
                <Wrench className="w-6 h-6" />
              </div>
              <p className="text-sm text-muted-foreground">Ignition Type</p>
              <p className="text-lg font-bold capitalize">{status.ignitionType}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* DTC Codes Detailed Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Diagnostic Trouble Codes Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          {dtcs.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
              <h3 className="text-lg font-medium text-foreground mb-2">No Issues Detected</h3>
              <p className="text-muted-foreground">Your vehicle is running without any diagnostic trouble codes.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {dtcs.map((code, index) => {
                const dtcInfo = CarHealthAnalyzer.dtcDatabase[code];
                
                return (
                  <div key={index} className="border rounded-lg p-4 bg-muted/30">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="font-mono text-lg font-bold text-primary">{code}</div>
                        {dtcInfo && (
                          <Badge variant={getSeverityColor(dtcInfo.severity)}>
                            {dtcInfo.severity.toUpperCase()}
                          </Badge>
                        )}
                      </div>
                      {dtcInfo && (
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <IndianRupee className="w-3 h-3" />
                            Est. ₹{dtcInfo.estimatedCost}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    {dtcInfo ? (
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          {getSeverityIcon(dtcInfo.severity)}
                          <div>
                            <p className="font-medium text-foreground">{dtcInfo.description}</p>
                            <p className="text-sm text-muted-foreground">Affects: {dtcInfo.partAffected}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-1">POSSIBLE CAUSE</p>
                            <p className="text-sm text-foreground">{dtcInfo.potentialCause}</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-1">REPAIR COMPLEXITY</p>
                            <Badge variant="outline" className="text-xs">
                              {dtcInfo.repairComplexity}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Info className="w-4 h-4" />
                        <p className="text-sm">Code description not available in database</p>
                      </div>
                    )}
                  </div>
                );
              })}
              
              {/* Summary Stats */}
              <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Summary</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-red-600">
                      {dtcs.filter(code => CarHealthAnalyzer.dtcDatabase[code]?.severity === 'high').length}
                    </p>
                    <p className="text-xs text-muted-foreground">Critical</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-yellow-600">
                      {dtcs.filter(code => CarHealthAnalyzer.dtcDatabase[code]?.severity === 'medium').length}
                    </p>
                    <p className="text-xs text-muted-foreground">Medium</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600">
                      {dtcs.filter(code => CarHealthAnalyzer.dtcDatabase[code]?.severity === 'low').length}
                    </p>
                    <p className="text-xs text-muted-foreground">Low</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">
                      ₹{dtcs.reduce((total, code) => {
                        const dtcInfo = CarHealthAnalyzer.dtcDatabase[code];
                        return total + (dtcInfo?.estimatedCost || 0);
                      }, 0)}
                    </p>
                    <p className="text-xs text-muted-foreground">Est. Total</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* OBD System Information */}
      {(obdData.obdCompliance || obdData.elmVersion) && (
        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {obdData.obdCompliance && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">OBD Compliance</p>
                  <p className="text-foreground">{obdData.obdCompliance}</p>
                </div>
              )}
              {obdData.elmVersion && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">ELM Version</p>
                  <p className="text-foreground">{obdData.elmVersion}</p>
                </div>
              )}
              {obdData.fuelStatus && obdData.fuelStatus[0] && (
                <div className="md:col-span-2">
                  <p className="text-sm font-medium text-muted-foreground">Fuel System Status</p>
                  <p className="text-sm text-foreground">{obdData.fuelStatus[0]}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}