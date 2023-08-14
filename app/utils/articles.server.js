export async function getArticleItemsFromQiita() {
    const url = "https://qiita.com/api/v2/users/daisuke-yamamoto/items?page=1&per_page=10";
    const response = await fetch(url);
    const data = await response.json();
    const result = data.map(item => ({
        title: item.title,
        url: item.url,
        id: item.id,
    }));
    return result;
/*
return fetch(`https://qiita.com/api/v2/users/daisuke-yamamoto/items?page=1&per_page=10`).then(
            (response) => response.json()
        );
*/
}
