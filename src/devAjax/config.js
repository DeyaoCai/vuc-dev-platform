export default {
  dockerImages: {type: "get", url: "/tape/docker/images"},
  dockerInspect: {type: "get", url: "/tape/docker/image/inspect/:id"},
  setCurrentWorkSpace: {type: "get", url: "/dev-tool/setCurrentWorkSpace"},
  getCurrentWorkSpace: {type: "get", url: "/dev-tool/getCurrentWorkSpace"},
  ctoolsConf: {type: "get", url: "/dev-tool/ctoolsConf"},
  getAllBranches: {type: "get", url: "/dev-tool/getAllBranches"},
  checkoutBranch: {type: "get", url: "/dev-tool/checkoutBranch"},
  applySetting: {type: "post", url: "/dev-tool/applySetting"},
  installDependence: {type: "get", url: "/dev-tool/installDependence"},
  startServer: {type: "get", url: "/dev-tool/startServer"},
  getGitDiff: {type: "get", url: "/dev-tool/getGitDiff"},
  dropChose: {type: "post", url: "/dev-tool/dropChose"},
  // getWorkSpaceDetail: {type: "get", url: "/dev-tool/getWorkSpaceDetail"},

}
