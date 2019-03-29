export default {
  dockerImages: {type: "get", url: "/tape/docker/images"},
  dockerInspect: {type: "get", url: "/tape/docker/image/inspect/:id"},
  setCurrentWorkSpace: {type: "get", url: "/dev-tool/setCurrentWorkSpace"},
  getCurrentWorkSpace: {type: "get", url: "/dev-tool/getCurrentWorkSpace"},
  ctoolsConf: {type: "get", url: "/dev-tool/ctoolsConf"},
  getAllBranches: {type: "get", url: "/dev-tool/getAllBranches"},
  checkoutBranch: {type: "get", url: "/dev-tool/checkoutBranch"},

  // getWorkSpaceDetail: {type: "get", url: "/dev-tool/getWorkSpaceDetail"},

}
