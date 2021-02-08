const utils = {}

utils.limitDescription = (description, letterlimit) => {
  return description.length <= letterlimit
    ? description
    : `${description.slice(0, letterlimit)}..`;
};

utils.getbookTitle =  async (selflink)=>{
  const data = await fetch(`${selflink}`)
  return data.title
}

export default utils
