export interface TerritoryName {
  code: string;
  name: string;
}

interface TerritoryBase {
  code: string;
  wikipedia_link: string;
}

export interface Territory extends TerritoryBase {
  groups: string[];
}

export interface TerritoryGroup extends TerritoryBase {
  territories: string[];
}
