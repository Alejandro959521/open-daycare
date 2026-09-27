export type CategoriaPost = "logro" | "actividad" | "anuncio";

export interface Post {
  id: string;
  autor: string; // "Mateo" | "Anuncio general"
  avatar: { inicial: string | null; bg: string; color: string }; // inicial null = icono megáfono
  hora: string; // "14:20"
  publicadoPorVos: boolean;
  categoria: CategoriaPost;
  destinatarios: string; // "familia de Mateo" | "toda la sala"
  texto: string;
  foto?: { etiqueta: string }; // solo en actividad
  corazones: number;
  comentarios: number;
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

// Chip por categoría: logro #CFEBD8/#3E9B6C · actividad #C7E7F1/#2E89A6 · anuncio #CCD8F4/#4E72C8
export const estilosPorCategoria: Record<
  CategoriaPost,
  { chipBg: string; chipColor: string; punto: string }
> = {
  logro: { chipBg: "#CFEBD8", chipColor: "#3E9B6C", punto: "#3E9B6C" },
  actividad: { chipBg: "#C7E7F1", chipColor: "#2E89A6", punto: "#2E89A6" },
  anuncio: { chipBg: "#CCD8F4", chipColor: "#4E72C8", punto: "#4E72C8" },
};
