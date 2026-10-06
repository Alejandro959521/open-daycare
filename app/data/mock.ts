export type CategoriaPost =
  | "comida"
  | "siesta"
  | "actividad"
  | "logro"
  | "animo"
  | "foto"
  | "anuncio";

export interface Post {
  id: string;
  autor: string;
  avatar: { inicial: string | null; bg: string; color: string };
  hora: string;
  publicadoPorVos: boolean;
  categoria: CategoriaPost;
  destinatarios: string;
  destinatariosIds?: string[];
  texto: string;
  foto?: { etiqueta: string };
  corazones: number;
  comentarios: number;
  createdAt?: string;
}

export const usuario = { nombre: "Caro Giménez", inicial: "C", rol: "Maestra · Soles" };
export const sala = { nombre: "Soles", cantidadNinos: 12, fechaTexto: "martes 17 jun" };

export const posts: Post[] = [
  {
    id: "1",
    autor: "Mateo",
    avatar: { inicial: "M", bg: "#A9D9E8", color: "#1F7A93" },
    hora: "14:20",
    publicadoPorVos: true,
    categoria: "logro",
    destinatarios: "familia de Mateo",
    texto: "¡Usó el orinal solito por primera vez! Estaba feliz de contárselo a todos. Un gran paso.",
    corazones: 3,
    comentarios: 1,
  },
  {
    id: "2",
    autor: "Mateo",
    avatar: { inicial: "M", bg: "#A9D9E8", color: "#1F7A93" },
    hora: "09:40",
    publicadoPorVos: true,
    categoria: "actividad",
    destinatarios: "familia de Mateo",
    texto: "Pintamos con témperas esta mañana. Mateo eligió el azul para todo y se concentró un montón mezclando colores.",
    foto: { etiqueta: "Foto · pintando con témperas" },
    corazones: 5,
    comentarios: 2,
  },
  {
    id: "3",
    autor: "Anuncio general",
    avatar: { inicial: null, bg: "#CCD8F4", color: "#4E72C8" },
    hora: "07:50",
    publicadoPorVos: true,
    categoria: "anuncio",
    destinatarios: "toda la sala",
    texto: "El viernes salimos al parque por la mañana. Recuerden mandar gorra y una botellita de agua.",
    corazones: 8,
    comentarios: 0,
  },
];

export const estilosPorCategoria: Record<
  CategoriaPost,
  { chipBg: string; chipColor: string; punto: string }
> = {
  comida: { chipBg: "#FBD8CC", chipColor: "#D9684A", punto: "#D9684A" },
  siesta: { chipBg: "#E7DCF6", chipColor: "#7B5FC0", punto: "#7B5FC0" },
  actividad: { chipBg: "#C7E7F1", chipColor: "#2E89A6", punto: "#2E89A6" },
  logro: { chipBg: "#CFEBD8", chipColor: "#3E9B6C", punto: "#3E9B6C" },
  animo: { chipBg: "#F9D2DE", chipColor: "#C56486", punto: "#C56486" },
  foto: { chipBg: "#FBD8CC", chipColor: "#D9684A", punto: "#D9684A" },
  anuncio: { chipBg: "#CCD8F4", chipColor: "#4E72C8", punto: "#4E72C8" },
};
