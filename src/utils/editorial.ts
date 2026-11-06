/**
 * Editorial terminology sanitization utilities.
 * Ensures consistent, professional editorial terminology across all public pages,
 * transforming legacy demonstration/demo labels into accurate editorial wording
 * while preserving FTC affiliate disclosures and documentation-based methodology statements.
 */

export function cleanEditorialText(text: string | null | undefined): string {
  if (!text || typeof text !== "string") return text || "";

  return text
    // Manually curated demonstration ranking variations
    .replace(/manually curated demonstration rankings/gi, "editorial provider rankings")
    .replace(/manually curated demonstration ranking/gi, "editorial ranking")
    .replace(/curated demonstration rankings/gi, "editorial rankings")
    .replace(/curated demonstration ranking/gi, "editorial ranking")
    .replace(/demonstration rankings/gi, "editorial rankings")
    .replace(/demonstration ranking/gi, "editorial ranking")
    // Notice and disclosure headers
    .replace(/Demonstration Ranking Disclosure/gi, "Editorial Ranking Policy")
    .replace(/Demonstration Ranking Notice/gi, "Editorial Ranking Policy")
    .replace(/Demonstration Platform Notice/gi, "Editorial Platform Notice")
    .replace(/Demonstration Ranking & Specification Policy/gi, "Editorial Ranking & Specification Policy")
    .replace(/Demonstration Rankings & No Warranty/gi, "Editorial Rankings & No Warranty")
    // Specific platform descriptions
    .replace(/demonstration review platform/gi, "independent proxy directory and review platform")
    .replace(/informational and demonstration purposes/gi, "informational purposes")
    .replace(/demonstration purposes/gi, "informational purposes")
    .replace(/demonstration placements/gi, "editorial placements")
    .replace(/demonstration dataset/gi, "editorial dataset")
    // Provider specific badges
    .replace(/#1 Featured Demo Pick/gi, "#1 Editor's Pick")
    .replace(/#1 Demo Pick • Curated Ranking/gi, "#1 Editor's Pick • Featured Provider")
    .replace(/#1 Demo Pick/gi, "#1 Editor's Pick")
    .replace(/Curated Demo Ranking/gi, "Editorial Ranking")
    .replace(/Demo Pick/gi, "Editor's Pick")
    .replace(/\(Demo #(\d+)\)/gi, "(Rank #$1)")
    .replace(/Demo Rank/gi, "Rank")
    .replace(/Demo #/gi, "Rank #");
}

export function cleanEditorialBadge(badge: string | null | undefined, rank?: number): string {
  if (rank === 1) return "#1 Editor's Pick";
  if (!badge) return rank ? `Rank #${rank}` : "";
  return cleanEditorialText(badge);
}

export function cleanPortableText(blocks: any): any {
  if (!blocks) return blocks;
  if (typeof blocks === "string") return cleanEditorialText(blocks);
  if (Array.isArray(blocks)) {
    return blocks.map(block => cleanPortableText(block));
  }
  if (typeof blocks === "object" && blocks !== null) {
    const cleaned: Record<string, any> = {};
    for (const [key, val] of Object.entries(blocks)) {
      if (key === "text" && typeof val === "string") {
        cleaned[key] = cleanEditorialText(val);
      } else if (typeof val === "object" && val !== null) {
        cleaned[key] = cleanPortableText(val);
      } else {
        cleaned[key] = val;
      }
    }
    return cleaned;
  }
  return blocks;
}
