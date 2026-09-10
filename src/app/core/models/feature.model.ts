export interface IFeatureItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  imageUrl?: string;
  fallbackSvg?: string;
  bulletPoints: string[];
  tags: string[];
}

export interface IFeatureCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
  colorHex: string;
}
