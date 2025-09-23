// Car Health Analytics Logic
export interface OBDData {
  vehicleInfo: {
    make: string;
    model: string;
    year: number;
    mileage: number;
    vin: string;
  };
  sensors: {
    engineRPM: number;
    vehicleSpeed: number;
    coolantTemp: number;
    intakeAirTemp: number;
    fuelPressure: number;
    oilTemp: number;
    batteryVoltage: number;
    fuelLevel: number;
    engineLoad: number;
    throttlePosition: number;
    o2Sensor: number;
    catalyticConverterTemp: number;
    transmissionTemp: number;
    brakeFluidLevel: number;
    tirePressure: {
      frontLeft: number;
      frontRight: number;
      rearLeft: number;
      rearRight: number;
    };
  };
  dtcCodes: Array<{
    code: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
  }>;
  timestamp: string;
}

export interface DamagedPart {
  component: string;
  status: 'Warning' | 'Critical';
  issue: string;
  severity: 'low' | 'medium' | 'high';
  currentValue: number | string;
  normalRange: number[] | string;
  repairCost: number;
  urgency: 'Immediate' | 'Soon' | 'Schedule';
}

export interface MaintenanceItem {
  component: string;
  timeToService: string;
  milesRemaining: number | string;
  currentCondition: string;
  priority: 'High' | 'Medium' | 'Low';
  estimatedCost: number;
}

export interface ResaleValue {
  baseValue: number;
  marketValue: number;
  tradeInValue: number;
  privatePartyValue: number;
  depreciation: {
    mileage: number;
    health: number;
    total: number;
  };
  factors: {
    mileage: number;
    excessMiles: number;
    healthScore: number;
    dtcCount: number;
  };
}

// Mock OBD Data
export const mockOBDData: OBDData = {
  vehicleInfo: {
    make: "Toyota",
    model: "Camry",
    year: 2019,
    mileage: 45000,
    vin: "1HGBH41JXMN109186"
  },
  sensors: {
    engineRPM: 750,
    vehicleSpeed: 0,
    coolantTemp: 89,
    intakeAirTemp: 25,
    fuelPressure: 58,
    oilTemp: 85,
    batteryVoltage: 12.6,
    fuelLevel: 75,
    engineLoad: 15,
    throttlePosition: 0,
    o2Sensor: 0.45,
    catalyticConverterTemp: 420,
    transmissionTemp: 78,
    brakeFluidLevel: 90,
    tirePressure: {
      frontLeft: 32,
      frontRight: 31,
      rearLeft: 30,
      rearRight: 32
    }
  },
  dtcCodes: [
    { code: "P0171", description: "System Too Lean (Bank 1)", severity: "medium" },
    { code: "P0420", description: "Catalyst System Efficiency Below Threshold", severity: "high" }
  ],
  timestamp: new Date().toISOString()
};

export class CarHealthAnalyzer {
  // Component health thresholds and rules
  static healthThresholds = {
    engine: {
      coolantTemp: { normal: [80, 95], warning: [95, 105], critical: 105 },
      oilTemp: { normal: [80, 110], warning: [110, 130], critical: 130 },
      rpm: { idle: [600, 1000], normal: [1000, 6500], redline: 6500 }
    },
    transmission: {
      temp: { normal: [70, 95], warning: [95, 110], critical: 110 }
    },
    battery: {
      voltage: { normal: [12.4, 14.4], warning: [11.8, 12.4], critical: 11.8 }
    },
    fuel: {
      pressure: { normal: [50, 65], warning: [40, 50], critical: 40 }
    },
    tires: {
      pressure: { normal: [30, 35], warning: [25, 30], critical: 25 }
    },
    catalyticConverter: {
      temp: { normal: [300, 500], warning: [500, 600], critical: 600 }
    }
  };

  // DTC code severity mapping
  static dtcSeverity = {
    'P0171': { component: 'fuel_system', severity: 'medium', impact: 0.15 },
    'P0420': { component: 'emissions', severity: 'high', impact: 0.25 },
    'P0300': { component: 'engine', severity: 'high', impact: 0.30 },
    'P0128': { component: 'cooling', severity: 'medium', impact: 0.12 },
    'P0442': { component: 'emissions', severity: 'low', impact: 0.08 }
  };

  // Analyze Damaged Car Parts
  static analyzeDamagedParts(obdData: OBDData): DamagedPart[] {
    const damagedParts: DamagedPart[] = [];
    const { sensors, dtcCodes } = obdData;

    // Engine Analysis
    if (sensors.coolantTemp > this.healthThresholds.engine.coolantTemp.critical) {
      damagedParts.push({
        component: 'Engine Cooling System',
        status: 'Critical',
        issue: 'Overheating detected',
        severity: 'high',
        currentValue: sensors.coolantTemp,
        normalRange: this.healthThresholds.engine.coolantTemp.normal,
        repairCost: 800,
        urgency: 'Immediate'
      });
    } else if (sensors.coolantTemp > this.healthThresholds.engine.coolantTemp.warning[1]) {
      damagedParts.push({
        component: 'Engine Cooling System',
        status: 'Warning',
        issue: 'Temperature running high',
        severity: 'medium',
        currentValue: sensors.coolantTemp,
        normalRange: this.healthThresholds.engine.coolantTemp.normal,
        repairCost: 300,
        urgency: 'Soon'
      });
    }

    // Battery Analysis
    if (sensors.batteryVoltage < this.healthThresholds.battery.voltage.critical) {
      damagedParts.push({
        component: 'Battery',
        status: 'Critical',
        issue: 'Low voltage - battery failing',
        severity: 'high',
        currentValue: sensors.batteryVoltage,
        normalRange: this.healthThresholds.battery.voltage.normal,
        repairCost: 150,
        urgency: 'Immediate'
      });
    }

    // Tire Pressure Analysis
    Object.entries(sensors.tirePressure).forEach(([position, pressure]) => {
      if (pressure < this.healthThresholds.tires.pressure.critical) {
        damagedParts.push({
          component: `Tire (${position})`,
          status: 'Critical',
          issue: 'Severely under-inflated',
          severity: 'medium',
          currentValue: pressure,
          normalRange: this.healthThresholds.tires.pressure.normal,
          repairCost: 25,
          urgency: 'Immediate'
        });
      }
    });

    // DTC Code Analysis
    dtcCodes.forEach(dtc => {
      const dtcInfo = this.dtcSeverity[dtc.code as keyof typeof this.dtcSeverity];
      if (dtcInfo) {
        damagedParts.push({
          component: dtcInfo.component.replace('_', ' ').toUpperCase(),
          status: dtc.severity === 'high' ? 'Critical' : 'Warning',
          issue: dtc.description,
          severity: dtc.severity,
          currentValue: dtc.code,
          normalRange: 'No codes',
          repairCost: dtc.severity === 'high' ? 500 : 200,
          urgency: dtc.severity === 'high' ? 'Soon' : 'Schedule'
        });
      }
    });

    return damagedParts;
  }

  // Estimate Time to Update Car Parts
  static estimateMaintenanceSchedule(obdData: OBDData): MaintenanceItem[] {
    const maintenanceSchedule: MaintenanceItem[] = [];
    const { sensors, vehicleInfo } = obdData;
    const currentMileage = vehicleInfo.mileage;

    // Engine Oil
    const oilChangeInterval = 5000;
    const lastOilChange = currentMileage % oilChangeInterval;
    const oilDue = oilChangeInterval - lastOilChange;
    
    maintenanceSchedule.push({
      component: 'Engine Oil',
      timeToService: this.calculateTimeToMiles(oilDue, 12000),
      milesRemaining: oilDue,
      currentCondition: sensors.oilTemp > 120 ? 'Degrading' : 'Good',
      priority: oilDue < 1000 ? 'High' : 'Medium',
      estimatedCost: 75
    });

    // Air Filter
    const airFilterInterval = 15000;
    const airFilterDue = airFilterInterval - (currentMileage % airFilterInterval);
    
    maintenanceSchedule.push({
      component: 'Air Filter',
      timeToService: this.calculateTimeToMiles(airFilterDue, 12000),
      milesRemaining: airFilterDue,
      currentCondition: sensors.intakeAirTemp > 35 ? 'Degrading' : 'Good',
      priority: airFilterDue < 2000 ? 'High' : 'Low',
      estimatedCost: 35
    });

    // Brake Pads
    const brakeInterval = 25000;
    const brakeDue = brakeInterval - (currentMileage % brakeInterval);
    
    maintenanceSchedule.push({
      component: 'Brake Pads',
      timeToService: this.calculateTimeToMiles(brakeDue, 12000),
      milesRemaining: brakeDue,
      currentCondition: sensors.brakeFluidLevel < 80 ? 'Needs Attention' : 'Good',
      priority: brakeDue < 3000 || sensors.brakeFluidLevel < 70 ? 'High' : 'Medium',
      estimatedCost: 300
    });

    // Battery
    const batteryAge = new Date().getFullYear() - vehicleInfo.year;
    const batteryLifeYears = 4;
    const batteryTimeRemaining = batteryLifeYears - batteryAge;
    
    maintenanceSchedule.push({
      component: 'Battery',
      timeToService: `${Math.max(0, batteryTimeRemaining)} years`,
      milesRemaining: 'Age-based',
      currentCondition: sensors.batteryVoltage < 12.0 ? 'Weak' : 'Good',
      priority: sensors.batteryVoltage < 12.0 || batteryTimeRemaining < 1 ? 'High' : 'Low',
      estimatedCost: 150
    });

    return maintenanceSchedule.sort((a, b) => {
      const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  // Estimate Car Resale Value
  static estimateResaleValue(obdData: OBDData): ResaleValue {
    const { vehicleInfo, sensors, dtcCodes } = obdData;
    
    // Base value calculation
    const baseValues: Record<string, Record<number, number>> = {
      'Toyota Camry': { 2019: 22000, 2018: 20000, 2017: 18000, 2016: 16000 }
    };
    
    const vehicleKey = `${vehicleInfo.make} ${vehicleInfo.model}`;
    let baseValue = baseValues[vehicleKey]?.[vehicleInfo.year] || 15000;
    
    // Mileage depreciation
    const avgMilesPerYear = 12000;
    const expectedMiles = (new Date().getFullYear() - vehicleInfo.year) * avgMilesPerYear;
    const excessMiles = Math.max(0, vehicleInfo.mileage - expectedMiles);
    const mileageDepreciation = excessMiles * 0.15;
    
    // Health-based depreciation
    let healthDepreciation = 0;
    
    // DTC codes impact
    dtcCodes.forEach(dtc => {
      const dtcInfo = this.dtcSeverity[dtc.code as keyof typeof this.dtcSeverity];
      if (dtcInfo) {
        healthDepreciation += baseValue * dtcInfo.impact;
      }
    });
    
    // Component condition impact
    if (sensors.coolantTemp > 100) healthDepreciation += baseValue * 0.05;
    if (sensors.batteryVoltage < 12.0) healthDepreciation += baseValue * 0.02;
    if (sensors.oilTemp > 130) healthDepreciation += baseValue * 0.08;
    
    // Calculate final values
    const adjustedValue = baseValue - mileageDepreciation - healthDepreciation;
    const marketValue = Math.max(adjustedValue * 0.85, baseValue * 0.3);
    const tradeInValue = marketValue * 0.8;
    const privatePartyValue = marketValue * 1.15;
    
    return {
      baseValue,
      marketValue: Math.round(marketValue),
      tradeInValue: Math.round(tradeInValue),
      privatePartyValue: Math.round(privatePartyValue),
      depreciation: {
        mileage: Math.round(mileageDepreciation),
        health: Math.round(healthDepreciation),
        total: Math.round(baseValue - marketValue)
      },
      factors: {
        mileage: vehicleInfo.mileage,
        excessMiles,
        healthScore: Math.round((1 - (healthDepreciation / baseValue)) * 100),
        dtcCount: dtcCodes.length
      }
    };
  }

  static calculateTimeToMiles(miles: number, milesPerYear: number): string {
    const months = Math.round((miles / milesPerYear) * 12);
    if (months < 1) return 'Due now';
    if (months === 1) return '1 month';
    if (months < 12) return `${months} months`;
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (remainingMonths === 0) return `${years} year${years > 1 ? 's' : ''}`;
    return `${years}y ${remainingMonths}m`;
  }
}