import { makeAutoObservable } from "mobx";
interface Package {
    name: string;
    trackingNumber: string;
    collected: boolean;
    latitude: number;
    longitude: number;
}

class PackageStore {
    packages: Package[] = [];
    filteredPackages: Package[] = [];
    constructor() {
        makeAutoObservable(this);
    }
    addPackage = (newPackage: Package) => {
        this.packages.push(newPackage);
    };
    setPackages(packages: Package[]) {
        this.packages = packages;
    }
    deletePackages(trackingNumber: string){
        this.packages=this.packages.filter(p=>p.trackingNumber!==trackingNumber)
        this.filteredPackages=this.packages;
    }
    toggleCollected(trackingNumber: string) {
        this.packages=this.packages.map(p=>
         p.trackingNumber===trackingNumber?{...p,collected:!p.collected}:p
        );
    }
 }  
export const packageStore = new PackageStore();