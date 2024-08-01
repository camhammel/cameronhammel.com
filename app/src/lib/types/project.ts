import type { SanityAsset } from "@sanity/image-url/lib/types/types";
import type { InputValue } from '@portabletext/svelte';

export type Quote = {
    quote: string;
    author: string;
    _key: string;
}

export type Section = {
    content: InputValue;
    image: SanityAsset;
    image_placement: 'left' | 'center' | 'right';
}

type ProjectColor = {
    main: { hex: string };
    light: { hex: string };
    dark: { hex: string };
}

export type Project = {
    slug: string;
    name: string;
    summary: string;
    start_date: string;
    hero_banner?: SanityAsset;
    tech_stack?: string[];
    sections?: Section[];
    quotes?: Quote[];
    colours: {
        primary: ProjectColor;
        secondary?: ProjectColor;
        tertiary?: ProjectColor;
    }
}
