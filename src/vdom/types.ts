export type DiffStatus = "added" | "removed" | "updated" | "unchanged";

export type VNode = {
    type: string;
    props: Record< string, any >;
    children: Array< VNode | string >;
    diffStatus?: DiffStatus;
};