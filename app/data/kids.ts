export type ParentStatus = "activa" | "pendiente";

export interface Parent {
  id: string;
  nombre: string;
  rol: string;
  estado: ParentStatus;
}

export interface Kid {
  id: string;
  nombre: string;
  inicial: string;
  edad: number;
  sala: string;
  fechaNacimiento: string;
  ingreso: string;
  alergias: string[];
  padres: Parent[];
  colorAvatar: { bg: string; textColor: string };
  notasMedicas?: string;
}

const NOMBRE_COLOR_MAP: Record<string, { bg: string; textColor: string }> = {
  Mateo: { bg: "#A9D9E8", textColor: "#1F7A93" },
  Sofia: { bg: "#F4B8CC", textColor: "#C44A7A" },
  Benjamin: { bg: "#B9DEC4", textColor: "#3E8B62" },
  Valentina: { bg: "#F4DC8E", textColor: "#9A7B1E" },
  Tomas: { bg: "#C9B6E8", textColor: "#7B5FC0" },
  Emma: { bg: "#F4B8CC", textColor: "#C44A7A" },
  Lucas: { bg: "#A9D9E8", textColor: "#1F7A93" },
  Olivia: { bg: "#B9DEC4", textColor: "#3E8B62" },
};

export function getAvatarColors(nombre: string): { bg: string; textColor: string } {
  const primerNombre = nombre.split(" ")[0];
  const normalizado = primerNombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return NOMBRE_COLOR_MAP[normalizado] ?? { bg: "#D8CBBA", textColor: "#7A6E60" };
}

export function calcularEdad(fechaNacimiento: string): number {
  const parts = fechaNacimiento.split("/");
  if (parts.length !== 3) return 0;
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);
  if (isNaN(day) || isNaN(month) || isNaN(year)) return 0;
  const birth = new Date(year, month - 1, day);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

export const kids: Kid[] = [
  {
    id: "1",
    nombre: "Mateo Fernández",
    inicial: "M",
    edad: 3,
    sala: "Soles",
    fechaNacimiento: "12 mar 2022",
    ingreso: "feb 2025",
    alergias: ["Alergia al maní", "Evitar frutos secos", "Lleva inhalador"],
    padres: [
      { id: "p1", nombre: "Lucía Fernández", rol: "Mamá", estado: "activa" },
      { id: "p2", nombre: "Diego Fernández", rol: "Papá", estado: "pendiente" },
    ],
    colorAvatar: { bg: "#A9D9E8", textColor: "#1F7A93" },
  },
  {
    id: "2",
    nombre: "Sofía Méndez",
    inicial: "S",
    edad: 2,
    sala: "Soles",
    fechaNacimiento: "5 ago 2023",
    ingreso: "mar 2025",
    alergias: [],
    padres: [
      { id: "p3", nombre: "Carolina Méndez", rol: "Mamá", estado: "activa" },
    ],
    colorAvatar: { bg: "#F4B8CC", textColor: "#C44A7A" },
  },
  {
    id: "3",
    nombre: "Benjamín Ruiz",
    inicial: "B",
    edad: 3,
    sala: "Soles",
    fechaNacimiento: "22 ene 2022",
    ingreso: "ene 2025",
    alergias: [],
    padres: [
      { id: "p4", nombre: "Andrea Ruiz", rol: "Mamá", estado: "activa" },
      { id: "p5", nombre: "Carlos Ruiz", rol: "Papá", estado: "activa" },
    ],
    colorAvatar: { bg: "#B9DEC4", textColor: "#3E8B62" },
  },
  {
    id: "4",
    nombre: "Valentina Soto",
    inicial: "V",
    edad: 2,
    sala: "Soles",
    fechaNacimiento: "15 nov 2023",
    ingreso: "abr 2025",
    alergias: [],
    padres: [],
    colorAvatar: { bg: "#F4DC8E", textColor: "#9A7B1E" },
  },
  {
    id: "5",
    nombre: "Tomás Díaz",
    inicial: "T",
    edad: 3,
    sala: "Soles",
    fechaNacimiento: "3 jun 2022",
    ingreso: "feb 2025",
    alergias: ["Intolerancia a la lactosa"],
    padres: [
      { id: "p6", nombre: "María Díaz", rol: "Mamá", estado: "activa" },
    ],
    colorAvatar: { bg: "#C9B6E8", textColor: "#7B5FC0" },
  },
  {
    id: "6",
    nombre: "Emma Castro",
    inicial: "E",
    edad: 2,
    sala: "Soles",
    fechaNacimiento: "28 jul 2023",
    ingreso: "mar 2025",
    alergias: [],
    padres: [
      { id: "p7", nombre: "Paula Castro", rol: "Mamá", estado: "activa" },
    ],
    colorAvatar: { bg: "#F4B8CC", textColor: "#C44A7A" },
  },
  {
    id: "7",
    nombre: "Lucas Romero",
    inicial: "L",
    edad: 3,
    sala: "Soles",
    fechaNacimiento: "10 abr 2022",
    ingreso: "ene 2025",
    alergias: [],
    padres: [
      { id: "p8", nombre: "Laura Romero", rol: "Mamá", estado: "activa" },
    ],
    colorAvatar: { bg: "#A9D9E8", textColor: "#1F7A93" },
  },
  {
    id: "8",
    nombre: "Olivia Vega",
    inicial: "O",
    edad: 2,
    sala: "Soles",
    fechaNacimiento: "19 sep 2023",
    ingreso: "abr 2025",
    alergias: [],
    padres: [
      { id: "p9", nombre: "Daniela Vega", rol: "Mamá", estado: "activa" },
    ],
    colorAvatar: { bg: "#B9DEC4", textColor: "#3E8B62" },
  },
];

export function getKidById(id: string): Kid | undefined {
  return kids.find((kid) => kid.id === id);
}

export function addKid(kid: Kid): void {
  kids.push(kid);
}
