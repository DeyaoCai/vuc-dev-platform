export default {
  dockerImages: {type: "get", url: "/tape/docker/images"},
  dockerInspect: {type: "get", url: "/tape/docker/image/inspect/:id"},
}
