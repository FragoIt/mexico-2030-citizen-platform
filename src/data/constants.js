import { Construction, Lightbulb, TreePine, Shield, Trash2 } from 'lucide-react';

export const CATEGORIES = [
  { id: 1, name: 'Malla Vial', icon: Construction, color: 'bg-orange-500', description: 'Baches, pavimento' },
  { id: 2, name: 'Alumbrado Público', icon: Lightbulb, color: 'bg-yellow-500', description: 'Postes, luminarias' },
  { id: 3, name: 'Arborización', icon: TreePine, color: 'bg-green-500', description: 'Árboles, zonas verdes' },
  { id: 4, name: 'Seguridad', icon: Shield, color: 'bg-red-500', description: 'Vigilancia, emergencias' },
  { id: 5, name: 'Aseo', icon: Trash2, color: 'bg-blue-500', description: 'Recolección, limpieza' },
];
