export interface Category {
  color: string;
  code: number;
  name: string;
}

type CategoryTuple = [string, number, string];

const createCategory = ([color, code, name]: CategoryTuple): Category => ({
  color,
  code,
  name,
});

const createCategories = (categories: CategoryTuple[]): Category[] =>
  categories.map(createCategory);

export const categories = createCategories([
  ['#2E96FC', 11, 'Management'],
  ['#31B39F', 13, 'Business and Financial Operations'],
  ['#5DC2B3', 15, 'Computer and Mathematical'],
  ['#73B9FE', 17, 'Architecture and Engineering'],
  ['#766CFB', 19, 'Life, Physical, and Social Science'],
  ['#8DD5CA', 21, 'Community and Social Service'],
  ['#958DFA', 23, 'Legal'],
  ['#A2D0FD', 25, 'Education, Training, and Library'],
  ['#C1BFFE', 27, 'Arts, Design, Entertainment, Sports, and Media'],
  ['#D0E7FF', 29, 'Healthcare Practitioners and Technical'],
  ['#D0EEE9', 31, 'Healthcare Support'],
  ['#DA8FC7', 33, 'Protective Service'],
  ['#DFDDFE', 35, 'Food Preparation and Serving Related'],
  ['#F79FE0', 37, 'Building and Grounds Cleaning and Maintenance'],
  ['#FEA333', 39, 'Personal Care and Service'],
  ['#FEB95D', 41, 'Sales and Related'],
  ['#FECE8B', 43, 'Office and Administrative Support'],
  ['#FED1DE', 45, 'Farming, Fishing, and Forestry'],
  ['#FEE1BA', 47, 'Construction and Extraction'],
  ['#FF4782', 49, 'Installation, Maintenance, and Repair'],
  ['#FF74A1', 51, 'Production'],
  ['#FFA3C0', 53, 'Transportation and Material Moving'],
  ['#FFD0F3', 55, 'Military Specific'],
]);

export const getCategoryForCode = (targetCode: number) => {
  const category = categories.find(({ code }) => code === targetCode);
  if (!category) {
    throw new Error(`No category for code ${targetCode}`);
  }
  return category;
};
