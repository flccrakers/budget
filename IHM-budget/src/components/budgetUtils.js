export function getCategory(reason, index, currentBudget) {
  let category = 'UNKNOWN';
  let data = currentBudget.filter(element => {
    if (element.categorieValues === undefined) return false;
    let categoriesFilter = element.categorieValues.filter(elementCat => {
      return reason.toUpperCase().includes(elementCat.label.toUpperCase());
    });
    return categoriesFilter.length > 0;
  });
  if (data.length === 1) {
    category = data[0].item.toUpperCase();
  } else if (data.length > 0) {
    category = getMostSimilar(data, reason).item.toUpperCase();
  }
  return category
}

function getMostSimilar(data, reason) {
  let chosenIndex = -1, longestCorrespondenceSize = 0;
  data.forEach((categoriesData, index) => {
    categoriesData.categorieValues.forEach(categoriesValue => {
      if (reason.includes(categoriesValue.value) && categoriesValue.value.length > longestCorrespondenceSize) {
        longestCorrespondenceSize = categoriesValue.value.length;
        chosenIndex = index;
      }
    })
  });
  if (chosenIndex === -1) return {item: 'UNKNOWN'};
  return data[chosenIndex];

}

export function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
  } catch (error) {
    console.error(error)
  }
};