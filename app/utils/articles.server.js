export async function getArticleItemsFromQiita() {
    const url = "https://qiita.com/api/v2/users/daisuke-yamamoto/items?page=1&per_page=20";
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
