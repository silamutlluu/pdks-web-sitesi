import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { LucideAngularModule, QrCode, CreditCard, Fingerprint, MapPin, Clock, CalendarClock, Timer, ClipboardCheck, Users, CalendarDays, WalletCards, Contact, ChartColumn, LayoutDashboard, ChartNoAxesColumnIncreasing, Building2, ShieldCheck, Network, Sparkles, Grid2x2, Loader2, AlertCircle, ChevronDown, Box, ArrowRight, Check, ChevronUp, Info, ScanFace, SplitSquareHorizontal, Smartphone, CheckCircle, MonitorSmartphone, LayoutTemplate, X, Bolt, Menu, Bell, Grid, Plus, PhoneCall, Mail, Send, Target, Eye, Shield, History, Trophy, Utensils, Package, Archive, Laptop, Tag, PackageCheck, Zap, FileLock2, Award, KeyRound, Server, Lock, FileBadge, Minus, Factory, Store, Briefcase, HardHat, HeartPulse, CheckCircle2, Cpu, HelpCircle, PieChart, Settings, Activity, FileSpreadsheet, BarChart3, Layers, Search, SearchX, ArrowUpRight, UserCheck, GraduationCap, Frown, User, Database, Cloud, WifiOff, Calculator, FileBadge2, Sun, Sunset, Moon, BellRing, Wifi, BatteryCharging, FileCheck2, RefreshCw, GripVertical, Trash2 } from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })
    ),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    importProvidersFrom(LucideAngularModule.pick({ QrCode, CreditCard, Fingerprint, MapPin, Clock, CalendarClock, Timer, ClipboardCheck, Users, CalendarDays, WalletCards, Contact, ChartColumn, LayoutDashboard, ChartNoAxesColumnIncreasing, Building2, ShieldCheck, Network, Sparkles, Grid2x2, Loader2, AlertCircle, ChevronDown, Box, ArrowRight, Check, ChevronUp, Info, ScanFace, SplitSquareHorizontal, Smartphone, CheckCircle, MonitorSmartphone, LayoutTemplate, X, Bolt, Menu, Bell, Grid, Plus, PhoneCall, Mail, Send, Target, Eye, Shield, History, Trophy, Utensils, Package, Archive, Laptop, Tag, PackageCheck, Zap, FileLock2, Award, KeyRound, Server, Lock, FileBadge, Minus, Factory, Store, Briefcase, HardHat, HeartPulse, CheckCircle2, Cpu, HelpCircle, PieChart, Settings, Activity, FileSpreadsheet, BarChart3, Layers, Search, SearchX, ArrowUpRight, UserCheck, GraduationCap, Frown, User, Database, Cloud, WifiOff, Calculator, FileBadge2, Sun, Sunset, Moon, BellRing, Wifi, BatteryCharging, FileCheck2, RefreshCw, GripVertical, Trash2 }))
  ]
};
