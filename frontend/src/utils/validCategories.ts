export const VALID_CATEGORIES = ["dining", "living", "bedroom"] as const;

export type ValidCategory = (typeof VALID_CATEGORIES)[number];

export function isValidCategory(
    category: string | undefined,
): category is ValidCategory {
    return VALID_CATEGORIES.includes(category as ValidCategory);
}
