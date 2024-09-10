

export type Item = {
    slug: string,
    name: string,
}

export type SectionItem = Item & {
    pages: tem[],
    subSections: SectionItem[],
}

export type SectionView = {
    id: string;
    inMenu: boolean;
    slug: string;
    published: boolean;
};
