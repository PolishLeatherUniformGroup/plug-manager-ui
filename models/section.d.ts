

export type Item={
    slug:string,
    name:string,
}

export type SectionItem = Item & {
    pages:tem[],
    subSections:SectionItem[],
}
