import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, AlertTriangle, TrendingUp, FileText, Search, CheckCircle2, XCircle, DollarSign } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadialBarChart, RadialBar } from "recharts";

const Insurance = () => {
  const [selectedClaim, setSelectedClaim] = useState<any>(null);
  const [verificationResults, setVerificationResults] = useState<any>(null);

  const claimsData = [
    {
      id: "CLM001",
      policyHolder: "Rajesh Kumar",
      vehicle: "2020 Tata Safari",
      claimType: "Engine Damage",
      amount: 45000,
      status: "Pending",
      riskScore: 85,
      obdFlags: ["P0300", "P0420"],
      fraudRisk: "High",
      timestamp: "2024-09-25 14:30"
    },
    {
      id: "CLM002",
      policyHolder: "Priya Sharma",
      vehicle: "2019 Mahindra Thar",
      claimType: "Collision",
      amount: 82000,
      status: "Verified",
      riskScore: 25,
      obdFlags: [],
      fraudRisk: "Low",
      timestamp: "2024-09-24 09:15"
    },
    {
      id: "CLM003",
      policyHolder: "Amit Singh",
      vehicle: "2021 Tata Nexon",
      claimType: "Transmission Issue",
      amount: 32000,
      status: "Flagged",
      riskScore: 92,
      obdFlags: ["P0700", "P0715"],
      fraudRisk: "Critical",
      timestamp: "2024-09-23 16:45"
    }
  ];

  const riskDistribution = [
    { name: "Low Risk", value: 65, color: "#10b981" },
    { name: "Medium Risk", value: 25, color: "#f59e0b" },
    { name: "High Risk", value: 10, color: "#ef4444" }
  ];

  const fraudTrends = [
    { month: "Jan", detected: 12, prevented: 8, saved: 850000 },
    { month: "Feb", detected: 15, prevented: 11, saved: 920000 },
    { month: "Mar", detected: 8, prevented: 6, saved: 670000 },
    { month: "Apr", detected: 18, prevented: 14, saved: 1250000 },
    { month: "May", detected: 22, prevented: 18, saved: 1560000 },
    { month: "Jun", detected: 19, prevented: 15, saved: 1380000 }
  ];

  const premiumAdjustments = [
    { segment: "Low Risk Drivers", adjustment: -15, count: 1250 },
    { segment: "Medium Risk Drivers", adjustment: 0, count: 980 },
    { segment: "High Risk Drivers", adjustment: 25, count: 420 },
    { segment: "Commercial Fleets", adjustment: -8, count: 350 }
  ];

  const handleClaimVerification = (claim: any) => {
    setSelectedClaim(claim);
    // Simulate OBD verification process
    const mockVerification = {
      dtcMatch: claim.obdFlags.length > 0 ? 95 : 15,
      sensorCorrelation: claim.fraudRisk === "Low" ? 92 : 35,
      timelineConsistency: claim.fraudRisk === "Critical" ? 25 : 88,
      overallScore: claim.fraudRisk === "Low" ? 90 : claim.fraudRisk === "High" ? 45 : 25
    };
    setVerificationResults(mockVerification);
  };

  const getRiskColor = (risk: string) => {
    switch(risk) {
      case "Critical": return "text-red-600 bg-red-50 border-red-200";
      case "High": return "text-orange-600 bg-orange-50 border-orange-200";
      case "Medium": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      default: return "text-green-600 bg-green-50 border-green-200";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Insurance Analytics</h2>
            <p className="text-muted-foreground">
              OBD-powered claim verification, risk assessment, and fraud detection
            </p>
          </div>
          <div className="flex sm:flex-row flex-col gap-2">
            <Button variant="outline" size="sm">
              <Search className="w-4 h-4 mr-2" />
              Search Claims
            </Button>
            <Button size="sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              Risk Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Claims Processed</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fraud Detection Rate</CardTitle>
              <Shield className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">94.2%</div>
              <p className="text-xs text-muted-foreground">AI-powered verification</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Money Saved</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">₹63.3L</div>
              <p className="text-xs text-muted-foreground">Fraud prevention YTD</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Processing Time</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4 days</div>
              <p className="text-xs text-muted-foreground">-40% reduction</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="claims" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="claims" className="line-clamp-1">Claims Verification</TabsTrigger>
            <TabsTrigger value="risk-scoring" className="line-clamp-1">Risk Scoring</TabsTrigger>
            <TabsTrigger value="fraud-detection" className="line-clamp-1">Fraud Detection</TabsTrigger>
            <TabsTrigger value="premium-optimization" className="line-clamp-1">Premium Optimization</TabsTrigger>
          </TabsList>

          <TabsContent value="claims" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Recent Claims
                </CardTitle>
                <CardDescription>OBD-verified claims with real-time risk assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {claimsData.map((claim) => (
                    <div key={claim.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{claim.id} - {claim.policyHolder}</div>
                        <div className="text-sm text-muted-foreground">
                          {claim.vehicle} • {claim.claimType} • ₹{claim.amount.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          OBD Flags: {claim.obdFlags.length > 0 ? claim.obdFlags.join(", ") : "None"}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={claim.status === "Verified" ? "default" : 
                                      claim.status === "Flagged" ? "destructive" : "secondary"}>
                          {claim.status}
                        </Badge>
                        <div className={`px-2 py-1 rounded text-xs border ${getRiskColor(claim.fraudRisk)}`}>
                          {claim.fraudRisk}
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => handleClaimVerification(claim)}>
                              Verify
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Claim Verification - {claim.id}</DialogTitle>
                              <DialogDescription>
                                OBD data analysis and fraud risk assessment
                              </DialogDescription>
                            </DialogHeader>
                            {verificationResults && (
                              <div className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                  <div className="space-y-3">
                                    <div className="flex justify-between">
                                      <span>DTC Code Match</span>
                                      <span className="font-medium">{verificationResults.dtcMatch}%</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Sensor Correlation</span>
                                      <span className="font-medium">{verificationResults.sensorCorrelation}%</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Timeline Consistency</span>
                                      <span className="font-medium">{verificationResults.timelineConsistency}%</span>
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-center">
                                    <div className="text-center">
                                      <div className={`text-4xl font-bold ${verificationResults.overallScore > 70 ? 'text-green-500' : 'text-red-500'}`}>
                                        {verificationResults.overallScore}%
                                      </div>
                                      <div className="text-sm text-muted-foreground">Overall Score</div>
                                    </div>
                                  </div>
                                </div>
                                <Alert>
                                  <AlertTriangle className="h-4 w-4" />
                                  <AlertDescription>
                                    {verificationResults.overallScore > 70 
                                      ? "Claim appears legitimate based on OBD data correlation."
                                      : "Potential fraud detected. Manual review recommended."}
                                  </AlertDescription>
                                </Alert>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risk-scoring" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Risk Distribution</CardTitle>
                  <CardDescription>Policyholder risk segmentation</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={riskDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({name, value}) => `${name}: ${value}%`}
                      >
                        {riskDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Dynamic Risk Scoring</CardTitle>
                  <CardDescription>Real-time OBD-based risk assessment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Driving Behavior</span>
                        <span>85/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{width: "85%"}}></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Vehicle Health</span>
                        <span>62/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{width: "62%"}}></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Maintenance History</span>
                        <span>78/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{width: "78%"}}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="fraud-detection" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Fraud Detection Trends</CardTitle>
                <CardDescription>Monthly fraud detection and prevention statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={fraudTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="detected" stroke="#ef4444" name="Cases Detected" />
                    <Line type="monotone" dataKey="prevented" stroke="#10b981" name="Fraud Prevented" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="premium-optimization" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Premium Adjustments</CardTitle>
                <CardDescription>Usage-based insurance optimization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {premiumAdjustments.map((segment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{segment.segment}</div>
                        <div className="text-sm text-muted-foreground">{segment.count} policyholders</div>
                      </div>
                      <div className={`flex items-center gap-2 ${segment.adjustment > 0 ? 'text-red-500' : segment.adjustment < 0 ? 'text-green-500' : 'text-gray-500'}`}>
                        {segment.adjustment > 0 ? '+' : ''}{segment.adjustment}%
                        {segment.adjustment > 0 && <TrendingUp className="w-4 h-4" />}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Insurance;