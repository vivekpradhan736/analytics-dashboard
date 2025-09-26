export interface OBDData {
  dtcs: string[];
  sensors: {
    batteryVoltage: number;
    tireTread?: number;
    oilLastService?: string;
    mileage: number;
    engineTemp: number;
    coolantLevel: number;
    rpm: number;
    intakeTemp: number;
    timingAdvance: number;
    throttleActuator: number;
    absoluteLoad: number;
    barometricPressure: number;
    controlModuleVoltage: number;
    relativeThrottlePos: number;
    acceleratorPosE: number;
    evapVaporPressureAbs: number;
    o2B1S2: number;
    shortFuelTrim1: number;
    o2S1WrCurrent: number;
    catalystTempB1S2: number;
    evaporativePurge: number;
    commandedEquivRatio: number;
    brakePressure?: number;
    fuelLevel?: number;
    transmissionTemp?: number;
  };
  vehicle: {
    make: string;
    model: string;
    year: number;
  };
  status: {
    mil: boolean;
    dtcCount: number;
    ignitionType: string;
  };
  monitors?: {
    [key: string]: string;
  };
  pids?: {
    pidsA: string;
    pidsB: string;
    pidsC: string;
  };
  fuelStatus?: string[];
  obdCompliance?: string;
  elmVersion?: string;
  time: string;
}

export interface DTCDescription {
  description: string;
  partAffected: string;
  severity: 'low' | 'medium' | 'high';
  potentialCause: string;
  repairComplexity: 'Simple' | 'Moderate' | 'Complex';
  estimatedCost: number;
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
  kmsRemaining: number | string;
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
    excessKms: number;
    healthScore: number;
    dtcCount: number;
  };
}

// Mock OBD Data - Updated Format
export const mockOBDData: OBDData = {
  dtcs: ["P0300", "P0420", "P0100"],
  sensors: {
    batteryVoltage: 12.5,
    tireTread: 4.5,
    oilLastService: "2023-01-01",
    mileage: 50000,
    engineTemp: 95,
    coolantLevel: 80,
    rpm: 916.25,
    intakeTemp: 31,
    timingAdvance: 5,
    throttleActuator: 16.862745098039216,
    absoluteLoad: 21.96078431372549,
    barometricPressure: 99,
    controlModuleVoltage: 13.959,
    relativeThrottlePos: 0,
    acceleratorPosE: 31.764705882352942,
    evapVaporPressureAbs: 99.94,
    o2B1S2: 0,
    shortFuelTrim1: 0,
    o2S1WrCurrent: -0.00390625,
    catalystTempB1S2: 68.7,
    evaporativePurge: 0,
    commandedEquivRatio: 0.998997,
    brakePressure: 90,
    fuelLevel: 75,
    transmissionTemp: 85
  },
  vehicle: {
    make: "Toyota",
    model: "Camry",
    year: 2020
  },
  status: {
    mil: false,
    dtcCount: 3,
    ignitionType: "spark"
  },
  monitors: {
    misfireCylinder1: "Average misfire counts for last ten driving cycles : 0.0 count [PASSED]",
    fuelSystemB1: "Unknown : 0.0 count [PASSED]",
    purgeFlow: "Unknown : 0.0 kilopascal [PASSED]"
  },
  pids: {
    pidsA: "10111110000111111010100000010011",
    pidsB: "10010000000001011011000000010101",
    pidsC: "11111010110111001010110000000001"
  },
  fuelStatus: ["Closed loop, using oxygen sensor feedback to determine fuel mix", ""],
  obdCompliance: "OBD-II as defined by the CARB",
  elmVersion: "ELM327 v1.5",
  time: "2025-09-24T18:08:00"
};

export class CarHealthAnalyzer {
  // Comprehensive DTC Database
  static dtcDatabase: Record<string, DTCDescription> = {
    'P0100': { description: 'Mass or Volume Air Flow Circuit Malfunction', partAffected: 'Air Intake', severity: 'medium', potentialCause: 'Faulty MAF sensor or wiring', repairComplexity: 'Simple', estimatedCost: 200 },
    'P0101': { description: 'Mass or Volume Air Flow Circuit Range/Performance Problem', partAffected: 'Air Intake', severity: 'medium', potentialCause: 'Dirty or faulty MAF sensor', repairComplexity: 'Simple', estimatedCost: 150 },
    'P0171': { description: 'System Too Lean (Bank 1)', partAffected: 'Fuel System', severity: 'medium', potentialCause: 'Vacuum leak or faulty O2 sensor', repairComplexity: 'Moderate', estimatedCost: 300 },
    'P0172': { description: 'System Too Rich (Bank 1)', partAffected: 'Fuel System', severity: 'medium', potentialCause: 'Faulty fuel injector or MAF sensor', repairComplexity: 'Moderate', estimatedCost: 350 },
    'P0174': { description: 'System Too Lean (Bank 2)', partAffected: 'Fuel System', severity: 'medium', potentialCause: 'Vacuum leak or intake manifold gasket', repairComplexity: 'Moderate', estimatedCost: 400 },
    'P0175': { description: 'System Too Rich (Bank 2)', partAffected: 'Fuel System', severity: 'medium', potentialCause: 'Faulty fuel pressure regulator', repairComplexity: 'Moderate', estimatedCost: 300 },
    'P0300': { description: 'Random/Multiple Cylinder Misfire Detected', partAffected: 'Engine', severity: 'high', potentialCause: 'Faulty spark plugs or ignition coils', repairComplexity: 'Simple', estimatedCost: 250 },
    'P0301': { description: 'Cylinder 1 Misfire Detected', partAffected: 'Engine', severity: 'high', potentialCause: 'Faulty spark plug or ignition coil cylinder 1', repairComplexity: 'Simple', estimatedCost: 150 },
    'P0302': { description: 'Cylinder 2 Misfire Detected', partAffected: 'Engine', severity: 'high', potentialCause: 'Faulty spark plug or ignition coil cylinder 2', repairComplexity: 'Simple', estimatedCost: 150 },
    'P0420': { description: 'Catalyst System Efficiency Below Threshold (Bank 1)', partAffected: 'Emissions', severity: 'high', potentialCause: 'Faulty catalytic converter or O2 sensors', repairComplexity: 'Complex', estimatedCost: 1200 },
    'P0430': { description: 'Catalyst System Efficiency Below Threshold (Bank 2)', partAffected: 'Emissions', severity: 'high', potentialCause: 'Faulty catalytic converter bank 2', repairComplexity: 'Complex', estimatedCost: 1200 },
    'P0442': { description: 'Evaporative Emission Control System Leak Detected (Small Leak)', partAffected: 'Emissions', severity: 'low', potentialCause: 'Loose gas cap or small EVAP leak', repairComplexity: 'Simple', estimatedCost: 100 },
    'P0446': { description: 'Evaporative Emission Control System Vent Control Circuit Malfunction', partAffected: 'Emissions', severity: 'medium', potentialCause: 'Faulty EVAP vent solenoid', repairComplexity: 'Moderate', estimatedCost: 200 },
    'P0507': { description: 'Idle Air Control System RPM Higher Than Expected', partAffected: 'Engine', severity: 'medium', potentialCause: 'Faulty idle air control valve or vacuum leak', repairComplexity: 'Moderate', estimatedCost: 250 },
    'P0700': { description: 'Transmission Control System Malfunction', partAffected: 'Transmission', severity: 'high', potentialCause: 'Internal transmission problem or TCM fault', repairComplexity: 'Complex', estimatedCost: 2000 },
    'P0135': { description: 'O2 Sensor Heater Circuit Malfunction (Bank 1 Sensor 1)', partAffected: 'Emissions', severity: 'medium', potentialCause: 'Faulty oxygen sensor heater', repairComplexity: 'Simple', estimatedCost: 180 }
  };

  // Component health thresholds and rules
  static healthThresholds = {
    engine: {
      temp: { normal: [80, 105], warning: [105, 115], critical: 115 },
      rpm: { idle: [600, 1000], normal: [1000, 6500], redline: 6500 },
      load: { normal: [0, 80], warning: [80, 95], critical: 95 }
    },
    transmission: {
      temp: { normal: [70, 95], warning: [95, 110], critical: 110 }
    },
    battery: {
      voltage: { normal: [12.4, 14.4], warning: [11.8, 12.4], critical: 11.8 }
    },
    coolant: {
      level: { normal: [70, 100], warning: [50, 70], critical: 50 }
    },
    catalyst: {
      temp: { normal: [300, 500], warning: [500, 650], critical: 650 }
    },
    fuel: {
      level: { normal: [25, 100], warning: [10, 25], critical: 10 },
      trim: { normal: [-10, 10], warning: [-25, 25], critical: 25 }
    },
    intake: {
      temp: { normal: [10, 40], warning: [40, 60], critical: 60 }
    },
    brake: {
      pressure: { normal: [80, 100], warning: [60, 80], critical: 60 }
    }
  };

  // Analyze Damaged Car Parts - Updated for new OBD structure
  static analyzeDamagedParts(obdData: OBDData): DamagedPart[] {
    const damagedParts: DamagedPart[] = [];
    const { sensors, dtcs } = obdData;

    // Engine Temperature Analysis
    if (sensors.engineTemp > this.healthThresholds.engine.temp.critical) {
      damagedParts.push({
        component: 'Engine Cooling System',
        status: 'Critical',
        issue: 'Engine overheating detected',
        severity: 'high',
        currentValue: sensors.engineTemp,
        normalRange: this.healthThresholds.engine.temp.normal,
        repairCost: 800,
        urgency: 'Immediate'
      });
    } else if (sensors.engineTemp > this.healthThresholds.engine.temp.warning[1]) {
      damagedParts.push({
        component: 'Engine Cooling System',
        status: 'Warning',
        issue: 'Engine temperature running high',
        severity: 'medium',
        currentValue: sensors.engineTemp,
        normalRange: this.healthThresholds.engine.temp.normal,
        repairCost: 300,
        urgency: 'Soon'
      });
    }

    // Coolant Level Analysis
    if (sensors.coolantLevel < this.healthThresholds.coolant.level.critical) {
      damagedParts.push({
        component: 'Coolant System',
        status: 'Critical',
        issue: 'Low coolant level detected',
        severity: 'high',
        currentValue: sensors.coolantLevel,
        normalRange: this.healthThresholds.coolant.level.normal,
        repairCost: 150,
        urgency: 'Immediate'
      });
    }

    // Battery Analysis
    if (sensors.batteryVoltage < this.healthThresholds.battery.voltage.critical) {
      damagedParts.push({
        component: 'Battery System',
        status: 'Critical',
        issue: 'Low battery voltage - battery failing',
        severity: 'high',
        currentValue: sensors.batteryVoltage,
        normalRange: this.healthThresholds.battery.voltage.normal,
        repairCost: 150,
        urgency: 'Immediate'
      });
    }

    // Engine Load Analysis
    if (sensors.absoluteLoad > this.healthThresholds.engine.load.warning[1]) {
      damagedParts.push({
        component: 'Engine Performance',
        status: 'Warning',
        issue: 'High engine load detected',
        severity: 'medium',
        currentValue: sensors.absoluteLoad,
        normalRange: this.healthThresholds.engine.load.normal,
        repairCost: 400,
        urgency: 'Schedule'
      });
    }

    // Fuel System Analysis
    if (sensors.fuelLevel && sensors.fuelLevel < this.healthThresholds.fuel.level.warning[0]) {
      damagedParts.push({
        component: 'Fuel System',
        status: 'Warning',
        issue: 'Low fuel level',
        severity: 'low',
        currentValue: sensors.fuelLevel,
        normalRange: this.healthThresholds.fuel.level.normal,
        repairCost: 0,
        urgency: 'Soon'
      });
    }

    // Transmission Temperature Analysis
    if (sensors.transmissionTemp && sensors.transmissionTemp > this.healthThresholds.transmission.temp.critical) {
      damagedParts.push({
        component: 'Transmission',
        status: 'Critical',
        issue: 'Transmission overheating',
        severity: 'high',
        currentValue: sensors.transmissionTemp,
        normalRange: this.healthThresholds.transmission.temp.normal,
        repairCost: 1200,
        urgency: 'Immediate'
      });
    }

    // Brake Pressure Analysis
    if (sensors.brakePressure && sensors.brakePressure < this.healthThresholds.brake.pressure.critical) {
      damagedParts.push({
        component: 'Brake System',
        status: 'Critical',
        issue: 'Low brake pressure detected',
        severity: 'high',
        currentValue: sensors.brakePressure,
        normalRange: this.healthThresholds.brake.pressure.normal,
        repairCost: 600,
        urgency: 'Immediate'
      });
    }

    // DTC Code Analysis
    dtcs.forEach(code => {
      const dtcInfo = this.dtcDatabase[code];
      if (dtcInfo) {
        damagedParts.push({
          component: dtcInfo.partAffected,
          status: dtcInfo.severity === 'high' ? 'Critical' : 'Warning',
          issue: dtcInfo.description,
          severity: dtcInfo.severity,
          currentValue: code,
          normalRange: 'No codes',
          repairCost: dtcInfo.estimatedCost,
          urgency: dtcInfo.severity === 'high' ? 'Soon' : 'Schedule'
        });
      }
    });

    return damagedParts;
  }

  // Estimate Maintenance Schedule - Updated for new OBD structure
  static estimateMaintenanceSchedule(obdData: OBDData): MaintenanceItem[] {
    const maintenanceSchedule: MaintenanceItem[] = [];
    const { sensors, vehicle } = obdData;
    const currentMileage = sensors.mileage;

    // Engine Oil based on last service date
    let oilDue = 5000;
    let oilCondition = 'Good';
    if (sensors.oilLastService) {
      const lastServiceDate = new Date(sensors.oilLastService);
      const monthsSince = (new Date().getTime() - lastServiceDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
      if (monthsSince > 6) {
        oilCondition = 'Overdue';
        oilDue = 0;
      } else if (monthsSince > 4) {
        oilCondition = 'Due Soon';
        oilDue = 500;
      }
    }
    
    maintenanceSchedule.push({
      component: 'Engine Oil',
      timeToService: this.calculateTimeToKms(oilDue, 12000),
      kmsRemaining: oilDue,
      currentCondition: oilCondition,
      priority: oilDue === 0 ? 'High' : 'Medium',
      estimatedCost: 75
    });

    // Air Filter
    const airFilterInterval = 15000;
    const airFilterDue = airFilterInterval - (currentMileage % airFilterInterval);
    
    maintenanceSchedule.push({
      component: 'Air Filter',
      timeToService: this.calculateTimeToKms(airFilterDue, 12000),
      kmsRemaining: airFilterDue,
      currentCondition: sensors.intakeTemp > 40 ? 'Degrading' : 'Good',
      priority: airFilterDue < 2000 ? 'High' : 'Low',
      estimatedCost: 35
    });

    // Brake System
    const brakeInterval = 25000;
    const brakeDue = brakeInterval - (currentMileage % brakeInterval);
    let brakeCondition = 'Good';
    if (sensors.brakePressure && sensors.brakePressure < 80) {
      brakeCondition = 'Needs Attention';
    }
    
    maintenanceSchedule.push({
      component: 'Brake Pads',
      timeToService: this.calculateTimeToKms(brakeDue, 12000),
      kmsRemaining: brakeDue,
      currentCondition: brakeCondition,
      priority: brakeDue < 3000 || brakeCondition === 'Needs Attention' ? 'High' : 'Medium',
      estimatedCost: 300
    });

    // Battery
    const batteryAge = new Date().getFullYear() - vehicle.year;
    const batteryLifeYears = 4;
    const batteryTimeRemaining = batteryLifeYears - batteryAge;
    
    maintenanceSchedule.push({
      component: 'Battery',
      timeToService: `${Math.max(0, batteryTimeRemaining)} years`,
      kmsRemaining: 'Age-based',
      currentCondition: sensors.batteryVoltage < 12.0 ? 'Weak' : 'Good',
      priority: sensors.batteryVoltage < 12.0 || batteryTimeRemaining < 1 ? 'High' : 'Low',
      estimatedCost: 150
    });

    // Transmission Service
    if (sensors.transmissionTemp) {
      const transInterval = 60000;
      const transDue = transInterval - (currentMileage % transInterval);
      
      maintenanceSchedule.push({
        component: 'Transmission Service',
        timeToService: this.calculateTimeToKms(transDue, 12000),
        kmsRemaining: transDue,
        currentCondition: sensors.transmissionTemp > 100 ? 'Overheating' : 'Good',
        priority: sensors.transmissionTemp > 100 ? 'High' : 'Low',
        estimatedCost: 200
      });
    }

    // Tire Replacement based on tread depth
    if (sensors.tireTread !== undefined) {
      const minTreadDepth = 2.0; // mm
      let tireCondition = 'Good';
      let tirePriority: 'High' | 'Medium' | 'Low' = 'Low';
      
      if (sensors.tireTread < minTreadDepth) {
        tireCondition = 'Replace Immediately';
        tirePriority = 'High';
      } else if (sensors.tireTread < 3.0) {
        tireCondition = 'Replace Soon';
        tirePriority = 'Medium';
      }
      
      maintenanceSchedule.push({
        component: 'Tires',
        timeToService: tireCondition === 'Replace Immediately' ? 'Overdue' : '6 months',
        kmsRemaining: tireCondition === 'Replace Immediately' ? 0 : 5000,
        currentCondition: tireCondition,
        priority: tirePriority,
        estimatedCost: 600
      });
    }

    return maintenanceSchedule.sort((a, b) => {
      const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  // Estimate Car Resale Value - Updated for new OBD structure
  static estimateResaleValue(obdData: OBDData): ResaleValue {
    const { vehicle, sensors, dtcs } = obdData;
    
    // Base value calculation
    const baseValues: Record<string, Record<number, number>> = {
      'Toyota Camry': { 2020: 24000, 2019: 22000, 2018: 20000, 2017: 18000, 2016: 16000 },
      'Honda Accord': { 2020: 25000, 2019: 23000, 2018: 21000, 2017: 19000, 2016: 17000 },
      'Ford F-150': { 2020: 35000, 2019: 32000, 2018: 29000, 2017: 26000, 2016: 23000 }
    };
    
    const vehicleKey = `${vehicle.make} ${vehicle.model}`;
    const baseValue = baseValues[vehicleKey]?.[vehicle.year] || 18000;
    
    // Mileage depreciation
    const avgKmsPerYear = 12000;
    const expectedKms = (new Date().getFullYear() - vehicle.year) * avgKmsPerYear;
    const excessKms = Math.max(0, sensors.mileage - expectedKms);
    const mileageDepreciation = excessKms * 0.12;
    
    // Health-based depreciation
    let healthDepreciation = 0;
    
    // DTC codes impact
    dtcs.forEach(code => {
      const dtcInfo = this.dtcDatabase[code];
      if (dtcInfo) {
        const impactMultiplier = dtcInfo.severity === 'high' ? 0.08 : dtcInfo.severity === 'medium' ? 0.04 : 0.02;
        healthDepreciation += baseValue * impactMultiplier;
      }
    });
    
    // Component condition impact
    if (sensors.engineTemp > 105) healthDepreciation += baseValue * 0.06;
    if (sensors.batteryVoltage < 12.0) healthDepreciation += baseValue * 0.03;
    if (sensors.coolantLevel < 60) healthDepreciation += baseValue * 0.04;
    if (sensors.transmissionTemp && sensors.transmissionTemp > 100) healthDepreciation += baseValue * 0.08;
    if (sensors.brakePressure && sensors.brakePressure < 70) healthDepreciation += baseValue * 0.05;
    if (sensors.tireTread && sensors.tireTread < 2.5) healthDepreciation += baseValue * 0.03;
    
    // Maintenance history impact
    if (sensors.oilLastService) {
      const lastServiceDate = new Date(sensors.oilLastService);
      const monthsSince = (new Date().getTime() - lastServiceDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
      if (monthsSince > 8) healthDepreciation += baseValue * 0.02;
    }
    
    // Calculate final values
    const adjustedValue = baseValue - mileageDepreciation - healthDepreciation;
    const marketValue = Math.max(adjustedValue * 0.88, baseValue * 0.35);
    const tradeInValue = marketValue * 0.82;
    const privatePartyValue = marketValue * 1.12;
    
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
        mileage: sensors.mileage,
        excessKms,
        healthScore: Math.round(Math.max(0, (1 - (healthDepreciation / baseValue)) * 100)),
        dtcCount: dtcs.length
      }
    };
  }

  static calculateTimeToKms(kms: number, kmsPerYear: number): string {
    const months = Math.round((kms / kmsPerYear) * 12);
    if (months < 1) return 'Due now';
    if (months === 1) return '1 month';
    if (months < 12) return `${months} months`;
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (remainingMonths === 0) return `${years} year${years > 1 ? 's' : ''}`;
    return `${years}y ${remainingMonths}m`;
  }
}