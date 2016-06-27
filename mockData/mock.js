module.exports = {
  rules: [
    {
      pattern: /\/api\/getDataList.php\?rtype=origin$/,
      respondwith: './listdata.json'
    },
    {
      pattern: /\/api\/getDataList.php\?rtype=more$/,
      respondwith: './loaddata.json'
    },
    {
      pattern: /\/api\/getDataList.php\?rtype=refresh$/,
      respondwith: './refresh.json'
    },
    {
      pattern: /\/api\/getDataArctile.php\?id=\w+/,
      respondwith: './arctile.json'
    }
  ]
};
