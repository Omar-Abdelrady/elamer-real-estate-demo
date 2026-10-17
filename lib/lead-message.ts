export type LeadFields = {
  transaction: "sale" | "rent";
  location: string;
  type: string;
  budget: string;
  notes: string;
};

const transactionLabels = { sale: "للبيع", rent: "للإيجار" } as const;
const typeLabels: Record<string, string> = {
  residential: "سكني",
  commercial: "تجاري",
  administrative: "إداري",
  villa: "فيلا",
  townhouse: "تاون هاوس",
};

export function buildLeadMessage(fields: LeadFields) {
  const notes = fields.notes.trim() ? ` ملاحظات: ${fields.notes.trim()}.` : "";
  return `مساء الخير، بدور على عقار ${transactionLabels[fields.transaction]}. المنطقة المفضلة: ${fields.location}. النوع: ${typeLabels[fields.type] ?? fields.type}. الميزانية: ${fields.budget || "غير محدد"}.${notes}`;
}
