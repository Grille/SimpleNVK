import nvk from "nvk"
import { pushHandle, deleteHandle, InitializedArray } from "./utils.mjs"

export let swapchainHandles = [];

export function createSwapchain(createInfo) {
  let { surface, width, height} = createInfo;
  let swapchainCreateInfo = new VkSwapchainCreateInfoKHR();
  swapchainCreateInfo.surface = surface;
  swapchainCreateInfo.minImageCount = 2;
  swapchainCreateInfo.imageFormat = VK_FORMAT_B8G8R8A8_UNORM;
  swapchainCreateInfo.imageColorSpace = VK_COLOR_SPACE_SRGB_NONLINEAR_KHR;
  swapchainCreateInfo.imageExtent = new VkExtent2D({ width: width, height: height });
  swapchainCreateInfo.imageArrayLayers = 1;
  swapchainCreateInfo.imageUsage = VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT;
  swapchainCreateInfo.imageSharingMode = VK_SHARING_MODE_EXCLUSIVE;
  swapchainCreateInfo.queueFamilyIndexCount = 0;
  swapchainCreateInfo.pQueueFamilyIndices = null;
  swapchainCreateInfo.preTransform = VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR;
  swapchainCreateInfo.compositeAlpha = VK_COMPOSITE_ALPHA_OPAQUE_BIT_KHR;
  swapchainCreateInfo.presentMode = VK_PRESENT_MODE_FIFO_KHR;
  swapchainCreateInfo.clipped = true;
  swapchainCreateInfo.oldSwapchain = null;

  let swapchain = new VkSwapchainKHR();
  let result = vkCreateSwapchainKHR(this.device, swapchainCreateInfo, null, swapchain);
  this.assertVulkan(result);

  let swapchainImageCount = { $: 0 };
  vkGetSwapchainImagesKHR(this.device, swapchain, swapchainImageCount, null);
  let swapchainImages = new InitializedArray(VkImage, swapchainImageCount.$);
  vkGetSwapchainImagesKHR(this.device, swapchain, swapchainImageCount, swapchainImages)

  let swapImageViews = [];//new InitializedArray(VkImageView, swapchainImageCount.$);
  for (let i = 0; i < swapchainImageCount.$; i++) {
    let imageViewCreateInfo = {
      image:swapchainImages[i],
    }
    swapImageViews[i] = this.createImageView(imageViewCreateInfo);
  }

  let handle = {
    id: -1,
    swapchain: swapchain,
    imageViews: swapImageViews,
    imageCount: swapchainImageCount.$,
    width: width,
    height: height,
  }

  pushHandle(this.swapchainHandles, handle);

  return handle;
}

export function destroySwapchain(handle) {
  if (handle.id === -1) return;
  for (let i = 0;i<handle.imageCount;i++)
    this.destroyImageView(handle.imageViews[i]);
  vkDestroySwapchainKHR(this.device, handle.swapchain, null);
  deleteHandle(this.swapchainHandles, handle);
}