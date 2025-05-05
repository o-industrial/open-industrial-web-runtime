export type SimulatorDefinition = {
  ID: string;
  Label: string;
  Description: string;
  Category: string;
};

export type SimulatorPackDefinition = {
  ID: string;
  Label: string;
  Description: string;
  Category: string;
  Simulators: SimulatorDefinition[];
};

export class SimulatorLibraryManager {
  private Simulators: SimulatorDefinition[] = [];
  private Packs: SimulatorPackDefinition[] = [];
  private Listeners = new Set<() => void>();

  constructor() {
    this.Simulators = [
      {
        ID: 'sim-roomstate',
        Label: 'RoomState Simulator',
        Description: 'Simulates environmental metrics in a lab.',
        Category: 'Environmental',
      },
      {
        ID: 'sim-hvac',
        Label: 'HVACSim',
        Description: 'Emulates airflow and fan control systems.',
        Category: 'Factory',
      },
      {
        ID: 'sim-opflow',
        Label: 'Occupancy Flow',
        Description: 'Tracks occupancy and motion-based routing.',
        Category: 'Environmental',
      },
      {
        ID: 'sim-biosensor',
        Label: 'BioSensor Pulse',
        Description: 'Streams simulated vitals in medical contexts.',
        Category: 'Medical',
      },
    ];

    this.Packs = [
      {
        ID: 'building-pack',
        Label: 'Smart Building Pack',
        Description: 'Includes RoomState, HVACSim, OccupancyFlow',
        Category: 'Environmental',
        Simulators: this.Simulators.filter((s) =>
          ['sim-roomstate', 'sim-hvac', 'sim-opflow'].includes(s.ID)
        ),
      },
    ];
  }

  public GetAll(): SimulatorDefinition[] {
    return [...this.Simulators];
  }

  public GetByCategory(category: string): SimulatorDefinition[] {
    if (category.toLowerCase() === 'all') return this.GetAll();
    return this.Simulators.filter(
      (sim) => sim.Category.toLowerCase() === category.toLowerCase()
    );
  }

  public GetPacksByCategory(category: string): SimulatorPackDefinition[] {
    if (category.toLowerCase() === 'all') return [...this.Packs];
    return this.Packs.filter(
      (pack) => pack.Category.toLowerCase() === category.toLowerCase()
    );
  }

  public ResolvePack(packId: string): SimulatorDefinition[] {
    const pack = this.Packs.find((p) => p.ID === packId);
    if (!pack) return [];
    return pack.Simulators.map((sim) =>
      this.Simulators.find((s) => s.ID === sim.ID)
    ).filter(Boolean) as SimulatorDefinition[];
  }

  public OnLibraryChanged(cb: () => void): void {
    this.Listeners.add(cb);
  }

  public OffLibraryChanged(cb: () => void): void {
    this.Listeners.delete(cb);
  }

  private Emit(): void {
    this.Listeners.forEach((cb) => cb());
  }
}
