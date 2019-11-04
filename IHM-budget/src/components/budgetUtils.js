export function getCategory(reason, index, currentBudget) {
  let category = 'UNKNOWN';
  let data = currentBudget.filter(element => {
    if (element.categorieValues === undefined) return false;
    let categoriesFilter = element.categorieValues.filter(elementCat => {
      if (elementCat.label === reason) {
      }
      return reason.includes(elementCat.label);
    });
    return categoriesFilter.length > 0;
  });

  if (data.length === 1) {
    category = data[0].item.toUpperCase();
  }
  return category
}