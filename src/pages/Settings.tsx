import React, { useState, useEffect } from 'react';
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { 
  User, 
  Car,
  Bell,
  Shield,
  Database,
  Palette,
  Download,
  Upload,
  Trash2,
  Save,
  RefreshCw
} from "lucide-react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';

// Validation schemas
const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name must be less than 50 characters'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name must be less than 50 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  timezone: z.string(),
  language: z.string(),
});

const vehicleSchema = z.object({
  make: z.string().min(1, 'Make is required'),
  model: z.string().min(1, 'Model is required'),
  year: z.number().min(1900, 'Invalid year').max(new Date().getFullYear() + 1, 'Invalid year'),
  vin: z.string().min(17, 'VIN must be 17 characters').max(17, 'VIN must be 17 characters'),
  mileage: z.number().min(0, 'Mileage must be positive'),
  engineSize: z.string(),
  obdDevice: z.string(),
  scanInterval: z.string(),
});

// Types
type ProfileData = z.infer<typeof profileSchema>;
type VehicleData = z.infer<typeof vehicleSchema>;

interface NotificationSettings {
  criticalAlerts: boolean;
  maintenanceReminders: boolean;
  performanceUpdates: boolean;
  valueAlerts: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
}

interface PrivacySettings {
  dataCollection: boolean;
  analyticsSharing: boolean;
  locationTracking: boolean;
}

interface AppearanceSettings {
  theme: string;
  dashboardLayout: string;
  chartStyle: string;
  showAdvancedMetrics: boolean;
  compactSidebar: boolean;
  enableAnimations: boolean;
}

export default function Settings() {
  const { toast } = useToast();
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  // Profile form
  const profileForm = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      timezone: 'est',
      language: 'en',
    }
  });

  // Vehicle form
  const vehicleForm = useForm<VehicleData>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      make: '',
      model: '',
      year: new Date().getFullYear(),
      vin: '',
      mileage: 0,
      engineSize: '2.5L',
      obdDevice: 'bluetooth',
      scanInterval: '5',
    }
  });

  // Notification settings state
  const [notifications, setNotifications] = useState<NotificationSettings>({
    criticalAlerts: true,
    maintenanceReminders: true,
    performanceUpdates: false,
    valueAlerts: true,
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
  });

  // Privacy settings state
  const [privacy, setPrivacy] = useState<PrivacySettings>({
    dataCollection: true,
    analyticsSharing: false,
    locationTracking: true,
  });

  // Appearance settings state
  const [appearance, setAppearance] = useState<AppearanceSettings>({
    theme: 'light',
    dashboardLayout: 'default',
    chartStyle: 'modern',
    showAdvancedMetrics: false,
    compactSidebar: false,
    enableAnimations: true,
  });

  // Load settings from localStorage on mount
  useEffect(() => {
    const loadSettings = () => {
      try {
        const storedProfile = localStorage.getItem('profile_settings');
        if (storedProfile) {
          const profileData = JSON.parse(storedProfile);
          profileForm.reset(profileData);
        }

        const storedVehicle = localStorage.getItem('vehicle_settings');
        if (storedVehicle) {
          const vehicleData = JSON.parse(storedVehicle);
          vehicleForm.reset(vehicleData);
        }

        const storedNotifications = localStorage.getItem('notification_settings');
        if (storedNotifications) {
          setNotifications(JSON.parse(storedNotifications));
        }

        const storedPrivacy = localStorage.getItem('privacy_settings');
        if (storedPrivacy) {
          setPrivacy(JSON.parse(storedPrivacy));
        }

        const storedAppearance = localStorage.getItem('appearance_settings');
        if (storedAppearance) {
          setAppearance(JSON.parse(storedAppearance));
        }

        const storedPhoto = localStorage.getItem('profile_photo');
        if (storedPhoto) {
          setProfilePhoto(storedPhoto);
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };

    loadSettings();
  }, [profileForm, vehicleForm]);

  // Save profile settings
  const onProfileSubmit = (data: ProfileData) => {
    try {
      localStorage.setItem('profile_settings', JSON.stringify(data));
      toast({
        title: "Profile Updated",
        description: "Your profile information has been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save profile settings.",
        variant: "destructive",
      });
    }
  };

  // Save vehicle settings
  const onVehicleSubmit = (data: VehicleData) => {
    try {
      localStorage.setItem('vehicle_settings', JSON.stringify(data));
      toast({
        title: "Vehicle Updated",
        description: "Your vehicle information has been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save vehicle settings.",
        variant: "destructive",
      });
    }
  };

  // Handle photo upload
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 2MB.",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfilePhoto(result);
        localStorage.setItem('profile_photo', result);
        toast({
          title: "Photo Updated",
          description: "Your profile photo has been updated successfully.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Save notification settings
  const saveNotifications = () => {
    try {
      localStorage.setItem('notification_settings', JSON.stringify(notifications));
      toast({
        title: "Notifications Updated",
        description: "Your notification preferences have been saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save notification settings.",
        variant: "destructive",
      });
    }
  };

  // Save privacy settings
  const savePrivacy = () => {
    try {
      localStorage.setItem('privacy_settings', JSON.stringify(privacy));
      toast({
        title: "Privacy Updated",
        description: "Your privacy settings have been saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save privacy settings.",
        variant: "destructive",
      });
    }
  };

  // Save appearance settings
  const saveAppearance = () => {
    try {
      localStorage.setItem('appearance_settings', JSON.stringify(appearance));
      
      // Apply theme immediately
      if (appearance.theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      toast({
        title: "Appearance Updated",
        description: "Your appearance settings have been saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save appearance settings.",
        variant: "destructive",
      });
    }
  };

  // Data management functions
  const exportData = () => {
    const allData = {
      profile: profileForm.getValues(),
      vehicle: vehicleForm.getValues(),
      notifications,
      privacy,
      appearance,
    };
    
    const dataStr = JSON.stringify(allData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'car-health-settings.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Data Exported",
      description: "Your settings have been exported successfully.",
    });
  };

  const deleteAllData = () => {
    if (window.confirm('Are you sure you want to delete all your data? This action cannot be undone.')) {
      localStorage.removeItem('profile_settings');
      localStorage.removeItem('vehicle_settings');
      localStorage.removeItem('notification_settings');
      localStorage.removeItem('privacy_settings');
      localStorage.removeItem('appearance_settings');
      localStorage.removeItem('profile_photo');
      
      // Reset forms
      profileForm.reset();
      vehicleForm.reset();
      setNotifications({
        criticalAlerts: true,
        maintenanceReminders: true,
        performanceUpdates: false,
        valueAlerts: true,
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: true,
      });
      setPrivacy({
        dataCollection: true,
        analyticsSharing: false,
        locationTracking: true,
      });
      setAppearance({
        theme: 'light',
        dashboardLayout: 'default',
        chartStyle: 'modern',
        showAdvancedMetrics: false,
        compactSidebar: false,
        enableAnimations: true,
      });
      setProfilePhoto(null);
      
      toast({
        title: "Data Deleted",
        description: "All your data has been deleted successfully.",
      });
    }
  };

  const syncVehicleData = () => {
    toast({
      title: "Syncing Data",
      description: "Connecting to OBD-II device...",
    });
    
    // Simulate sync process
    setTimeout(() => {
      toast({
        title: "Sync Complete",
        description: "Vehicle data has been synchronized successfully.",
      });
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-2">
            Customize your Car Health Analytics Dashboard experience
          </p>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="flex w-full overflow-x-auto scrollbar-hide">
            <TabsTrigger value="profile" className="flex-shrink-0">Profile</TabsTrigger>
            <TabsTrigger value="vehicle" className="flex-shrink-0">Vehicle</TabsTrigger>
            <TabsTrigger value="notifications" className="flex-shrink-0">Notifications</TabsTrigger>
            <TabsTrigger value="data" className="flex-shrink-0">Data & Privacy</TabsTrigger>
            <TabsTrigger value="appearance" className="flex-shrink-0">Appearance</TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-dashboard-red" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center overflow-hidden">
                    {profilePhoto ? (
                      <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-10 h-10 text-white" />
                    )}
                  </div>
                  <div className="space-y-2">
                    <input
                      type="file"
                      id="photo-upload"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => document.getElementById('photo-upload')?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Photo
                    </Button>
                    <p className="text-xs text-muted-foreground">JPG, PNG up to 2MB</p>
                  </div>
                </div>

                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={profileForm.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={profileForm.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={profileForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="+1 (555) 123-4567" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={profileForm.control}
                        name="timezone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Timezone</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="pst">Pacific Standard Time</SelectItem>
                                <SelectItem value="mst">Mountain Standard Time</SelectItem>
                                <SelectItem value="cst">Central Standard Time</SelectItem>
                                <SelectItem value="est">Eastern Standard Time</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={profileForm.control}
                        name="language"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Language</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="en">English</SelectItem>
                                <SelectItem value="es">Spanish</SelectItem>
                                <SelectItem value="fr">French</SelectItem>
                                <SelectItem value="de">German</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex justify-end gap-3">
                      <Button type="button" variant="outline" onClick={() => profileForm.reset()}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Vehicle Settings */}
          <TabsContent value="vehicle" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="w-5 h-5 text-dashboard-red" />
                  Vehicle Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Form {...vehicleForm}>
                  <form onSubmit={vehicleForm.handleSubmit(onVehicleSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={vehicleForm.control}
                        name="make"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Make</FormLabel>
                            <FormControl>
                              <Input placeholder="Toyota" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={vehicleForm.control}
                        name="model"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Model</FormLabel>
                            <FormControl>
                              <Input placeholder="Camry" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={vehicleForm.control}
                        name="year"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Year</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                {...field} 
                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={vehicleForm.control}
                        name="vin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>VIN</FormLabel>
                            <FormControl>
                              <Input placeholder="1HGBH41JXMN109186" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={vehicleForm.control}
                        name="mileage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Mileage</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                {...field} 
                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={vehicleForm.control}
                        name="engineSize"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Engine Size</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="1.8L">1.8L</SelectItem>
                                <SelectItem value="2.0L">2.0L</SelectItem>
                                <SelectItem value="2.5L">2.5L</SelectItem>
                                <SelectItem value="3.0L">3.0L</SelectItem>
                                <SelectItem value="3.5L">3.5L</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground">OBD-II Settings</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={vehicleForm.control}
                          name="obdDevice"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>OBD Device Type</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="bluetooth">Bluetooth OBD-II</SelectItem>
                                  <SelectItem value="wifi">WiFi OBD-II</SelectItem>
                                  <SelectItem value="usb">USB OBD-II</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={vehicleForm.control}
                          name="scanInterval"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Scan Interval</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="1">1 second</SelectItem>
                                  <SelectItem value="5">5 seconds</SelectItem>
                                  <SelectItem value="10">10 seconds</SelectItem>
                                  <SelectItem value="30">30 seconds</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3">
                      <Button type="button" variant="outline" onClick={syncVehicleData}>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Sync Now
                      </Button>
                      <Button type="submit">
                        <Save className="w-4 h-4 mr-2" />
                        Save Vehicle Info
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-dashboard-red" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium text-foreground">Critical Alerts</h4>
                      <p className="text-sm text-muted-foreground">Get notified immediately for critical issues</p>
                    </div>
                    <Switch 
                      checked={notifications.criticalAlerts}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, criticalAlerts: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium text-foreground">Maintenance Reminders</h4>
                      <p className="text-sm text-muted-foreground">Scheduled maintenance notifications</p>
                    </div>
                    <Switch 
                      checked={notifications.maintenanceReminders}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, maintenanceReminders: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium text-foreground">Performance Updates</h4>
                      <p className="text-sm text-muted-foreground">Weekly performance summaries</p>
                    </div>
                    <Switch 
                      checked={notifications.performanceUpdates}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, performanceUpdates: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium text-foreground">Value Alerts</h4>
                      <p className="text-sm text-muted-foreground">Resale value changes and market updates</p>
                    </div>
                    <Switch 
                      checked={notifications.valueAlerts}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, valueAlerts: checked }))
                      }
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Delivery Methods</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium text-foreground">Email Notifications</h4>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch 
                        checked={notifications.emailNotifications}
                        onCheckedChange={(checked) => 
                          setNotifications(prev => ({ ...prev, emailNotifications: checked }))
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium text-foreground">SMS Notifications</h4>
                        <p className="text-sm text-muted-foreground">Receive notifications via text message</p>
                      </div>
                      <Switch 
                        checked={notifications.smsNotifications}
                        onCheckedChange={(checked) => 
                          setNotifications(prev => ({ ...prev, smsNotifications: checked }))
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium text-foreground">Push Notifications</h4>
                        <p className="text-sm text-muted-foreground">Browser and mobile push notifications</p>
                      </div>
                      <Switch 
                        checked={notifications.pushNotifications}
                        onCheckedChange={(checked) => 
                          setNotifications(prev => ({ ...prev, pushNotifications: checked }))
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={saveNotifications}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Notifications
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data & Privacy */}
          <TabsContent value="data" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-dashboard-red" />
                  Data & Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium text-foreground">Data Collection</h4>
                      <p className="text-sm text-muted-foreground">Allow collection of vehicle performance data</p>
                    </div>
                    <Switch 
                      checked={privacy.dataCollection}
                      onCheckedChange={(checked) => 
                        setPrivacy(prev => ({ ...prev, dataCollection: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium text-foreground">Analytics Sharing</h4>
                      <p className="text-sm text-muted-foreground">Share anonymized data for improving analytics</p>
                    </div>
                    <Switch 
                      checked={privacy.analyticsSharing}
                      onCheckedChange={(checked) => 
                        setPrivacy(prev => ({ ...prev, analyticsSharing: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium text-foreground">Location Tracking</h4>
                      <p className="text-sm text-muted-foreground">Track location for driving pattern analysis</p>
                    </div>
                    <Switch 
                      checked={privacy.locationTracking}
                      onCheckedChange={(checked) => 
                        setPrivacy(prev => ({ ...prev, locationTracking: checked }))
                      }
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Data Management</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="justify-start" onClick={exportData}>
                      <Download className="w-4 h-4 mr-2" />
                      Export My Data
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Database className="w-4 h-4 mr-2" />
                      Data Usage Report
                    </Button>
                    <Button 
                      variant="outline" 
                      className="justify-start text-dashboard-red border-dashboard-red hover:bg-dashboard-red hover:text-white"
                      onClick={deleteAllData}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete All Data
                    </Button>
                    <Button variant="outline" className="justify-start" onClick={savePrivacy}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Privacy Settings
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">Data Retention</h4>
                  <p className="text-sm text-muted-foreground">
                    Your vehicle data is stored for up to 2 years. You can request deletion at any time.
                    Historical data helps improve maintenance predictions and resale value estimates.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance */}
          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-dashboard-red" />
                  Appearance Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <Select 
                      value={appearance.theme}
                      onValueChange={(value) => setAppearance(prev => ({ ...prev, theme: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Dashboard Layout</Label>
                    <Select 
                      value={appearance.dashboardLayout}
                      onValueChange={(value) => setAppearance(prev => ({ ...prev, dashboardLayout: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="compact">Compact</SelectItem>
                        <SelectItem value="spacious">Spacious</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Chart Style</Label>
                    <Select 
                      value={appearance.chartStyle}
                      onValueChange={(value) => setAppearance(prev => ({ ...prev, chartStyle: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="modern">Modern</SelectItem>
                        <SelectItem value="minimal">Minimal</SelectItem>
                        <SelectItem value="classic">Classic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Display Options</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium text-foreground">Advanced Metrics</h4>
                      <p className="text-sm text-muted-foreground">Show detailed technical metrics</p>
                    </div>
                    <Switch 
                      checked={appearance.showAdvancedMetrics}
                      onCheckedChange={(checked) => 
                        setAppearance(prev => ({ ...prev, showAdvancedMetrics: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium text-foreground">Compact Sidebar</h4>
                      <p className="text-sm text-muted-foreground">Use icons only in navigation</p>
                    </div>
                    <Switch 
                      checked={appearance.compactSidebar}
                      onCheckedChange={(checked) => 
                        setAppearance(prev => ({ ...prev, compactSidebar: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium text-foreground">Animations</h4>
                      <p className="text-sm text-muted-foreground">Enable smooth transitions and effects</p>
                    </div>
                    <Switch 
                      checked={appearance.enableAnimations}
                      onCheckedChange={(checked) => 
                        setAppearance(prev => ({ ...prev, enableAnimations: checked }))
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={saveAppearance}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Appearance
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}