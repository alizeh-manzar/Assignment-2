$(document).ready(() => {
    // Hide chat box initially
    $("#chatBox").hide()
  
    // DOM Manipulation - Smooth scrolling for navigation
    $('a[href^="#"]').on("click", function (e) {
      e.preventDefault()
      const target = $(this.getAttribute("href"))
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top - 80,
          },
          800,
        )
      }
    })
  
    // jQuery - Toggle feature details
    $(".learn-more-btn").on("click", function (e) {
      e.preventDefault()
      const details = $(this).next(".feature-details")
      details.slideToggle(300)
      $(this).text(details.is(":visible") ? "Show Less" : "Learn More")
    })
  
    // jQuery - Feature card click to show modal with AJAX data
    $(".feature-card").on("click", function (e) {
      if (!$(e.target).hasClass("learn-more-btn")) {
        const featureType = $(this).data("feature")
  
        // AJAX request to get feature details
        $.ajax({
          url: "data/features.json",
          dataType: "json",
          success: (data) => {
            const feature = data.features.find((f) => f.id === featureType)
            if (feature) {
              $("#featureModalLabel").text(feature.title)
  
              let modalContent = `
                            <div class="text-center mb-4">
                                <i class="bi ${feature.icon} text-primary" style="font-size: 3rem;"></i>
                            </div>
                            <p>${feature.description}</p>
                            <h5>Key Benefits:</h5>
                            <ul>
                        `
  
              feature.benefits.forEach((benefit) => {
                modalContent += `<li>${benefit}</li>`
              })
  
              modalContent += `
                            </ul>
                            <div class="mt-4">
                                <h5>Used by:</h5>
                                <p>${feature.usedBy.join(", ")}</p>
                            </div>
                        `
  
              $("#featureModalBody").html(modalContent)
  
              // Show the modal
              const featureModal = new bootstrap.Modal(document.getElementById("featureModal"))
              featureModal.show()
            }
          },
          error: () => {
            showNotification("Failed to load feature details", "error")
          },
        })
      }
    })
  
    // AJAX - Load more features
    $("#loadMoreFeatures").on("click", function () {
      const $btn = $(this)
      const $container = $("#additionalFeatures")
  
      $btn
        .prop("disabled", true)
        .html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...')
  
      // AJAX request to get additional features
      $.ajax({
        url: "data/more-features.json",
        dataType: "json",
        success: (data) => {
          let featuresHTML = ""
  
          data.features.forEach((feature) => {
            featuresHTML += `
                        <div class="col-md-4 mb-4">
                            <div class="card h-100 feature-card" data-feature="${feature.id}">
                                <div class="card-body">
                                    <i class="bi ${feature.icon} text-primary mb-3" style="font-size: 2rem;"></i>
                                    <h5 class="card-title">${feature.title}</h5>
                                    <p class="card-text">${feature.shortDescription}</p>
                                    <button class="btn btn-sm btn-outline-primary mt-2 learn-more-btn">Learn More</button>
                                    <div class="feature-details mt-3" style="display: none;">
                                        <p>${feature.description}</p>
                                        <ul>
                                            ${feature.points.map((point) => `<li>${point}</li>`).join("")}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `
          })
  
          $container.html(featuresHTML)
          $container.slideDown(500)
          $btn.text("All Features Loaded").addClass("btn-success").removeClass("btn-primary")
  
          // Attach event listeners to new elements
          $container.find(".learn-more-btn").on("click", function (e) {
            e.preventDefault()
            const details = $(this).next(".feature-details")
            details.slideToggle(300)
            $(this).text(details.is(":visible") ? "Show Less" : "Learn More")
          })
  
          $container.find(".feature-card").on("click", function (e) {
            if (!$(e.target).hasClass("learn-more-btn")) {
              const featureType = $(this).data("feature")
  
              // AJAX request to get feature details
              $.ajax({
                url: "data/features.json",
                dataType: "json",
                success: (data) => {
                  const feature =
                    data.features.find((f) => f.id === featureType) ||
                    data.additionalFeatures.find((f) => f.id === featureType)
  
                  if (feature) {
                    $("#featureModalLabel").text(feature.title)
  
                    let modalContent = `
                                        <div class="text-center mb-4">
                                            <i class="bi ${feature.icon} text-primary" style="font-size: 3rem;"></i>
                                        </div>
                                        <p>${feature.description}</p>
                                        <h5>Key Benefits:</h5>
                                        <ul>
                                    `
  
                    feature.benefits.forEach((benefit) => {
                      modalContent += `<li>${benefit}</li>`
                    })
  
                    modalContent += `
                                        </ul>
                                        <div class="mt-4">
                                            <h5>Used by:</h5>
                                            <p>${feature.usedBy.join(", ")}</p>
                                        </div>
                                    `
  
                    $("#featureModalBody").html(modalContent)
  
                    // Show the modal
                    const featureModal = new bootstrap.Modal(document.getElementById("featureModal"))
                    featureModal.show()
                  }
                },
                error: () => {
                  showNotification("Failed to load feature details", "error")
                },
              })
            }
          })
        },
        error: () => {
          $btn.prop("disabled", false).text("Load More Features")
          showNotification("Failed to load additional features", "error")
        },
      })
    })
  
    // Replace the AJAX testimonials code with static testimonials
    // Instead of AJAX, use static testimonials data
    const testimonials = [
      {
        quote:
          "Momentum has completely transformed how our team collaborates. The task organization features are intuitive and powerful.",
        name: "Sarah Johnson",
        position: "Project Manager",
        company: "TechCorp",
      },
      {
        quote:
          "Since implementing Momentum, we've seen a 40% increase in project completion rates. The progress tracking is a game-changer.",
        name: "Michael Chen",
        position: "CTO",
        company: "Innovate Inc.",
      },
      {
        quote:
          "The customer support team at Momentum is exceptional. They're responsive, knowledgeable, and always willing to help.",
        name: "Jessica Williams",
        position: "Operations Director",
        company: "Global Solutions",
      },
    ]
  
    let testimonialsHTML = ""
    testimonials.forEach((testimonial, index) => {
      testimonialsHTML += `
        <div class="carousel-item ${index === 0 ? "active" : ""}">
          <div class="testimonial-card text-center">
            <p class="quote">"${testimonial.quote}"</p>
            <p class="author">${testimonial.name}</p>
            <p class="position">${testimonial.position}, ${testimonial.company}</p>
          </div>
        </div>
      `
    })
  
    $("#testimonialCarousel .carousel-inner").html(testimonialsHTML)
  
    // AJAX - Compare plans
    $("#compareBtn").on("click", function () {
      const $btn = $(this)
      const $container = $("#comparisonTable")
  
      if ($container.is(":visible")) {
        $container.slideUp(300)
        $btn.text("Compare Plans")
        return
      }
  
      $btn
        .prop("disabled", true)
        .html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...')
  
      // AJAX request to get plan comparison data
      $.ajax({
        url: "data/plans.json",
        dataType: "json",
        success: (data) => {
          let tableHTML = `
                    <table class="comparison-table">
                        <thead>
                            <tr>
                                <th>Feature</th>
                `
  
          data.plans.forEach((plan) => {
            tableHTML += `<th>${plan.name}</th>`
          })
  
          tableHTML += `
                            </tr>
                        </thead>
                        <tbody>
                `
  
          data.features.forEach((feature) => {
            tableHTML += `
                        <tr>
                            <td>${feature.name}</td>
                    `
  
            data.plans.forEach((plan) => {
              const planFeature = plan.features[feature.id]
              if (typeof planFeature === "boolean") {
                tableHTML += `<td>${planFeature ? '<i class="bi bi-check-lg text-success"></i>' : '<i class="bi bi-x-lg text-danger"></i>'}</td>`
              } else {
                tableHTML += `<td>${planFeature}</td>`
              }
            })
  
            tableHTML += `</tr>`
          })
  
          tableHTML += `
                        </tbody>
                    </table>
                `
  
          $container.html(tableHTML)
          $container.slideDown(500)
          $btn.prop("disabled", false).text("Hide Comparison")
        },
        error: () => {
          $container.html('<div class="alert alert-danger">Failed to load plan comparison</div>')
          $container.slideDown(300)
          $btn.prop("disabled", false).text("Compare Plans")
        },
      })
    })
  
    // AJAX - Load office locations
    $("#loadOffices").on("click", function () {
      const $btn = $(this)
      const $container = $("#officeList")
  
      if ($container.is(":visible")) {
        $container.slideUp(300)
        $btn.text("Show Office Locations")
        return
      }
  
      $btn
        .prop("disabled", true)
        .html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...')
  
      // AJAX request to get office locations
      $.ajax({
        url: "data/offices.json",
        dataType: "json",
        success: (data) => {
          let officesHTML = '<div class="list-group">'
  
          data.offices.forEach((office) => {
            officesHTML += `
                        <div class="list-group-item">
                            <h5 class="mb-1">${office.city}, ${office.country}</h5>
                            <p class="mb-1">${office.address}</p>
                            <small>${office.phone}</small>
                        </div>
                    `
          })
  
          officesHTML += "</div>"
  
          $container.html(officesHTML)
          $container.slideDown(500)
          $btn.prop("disabled", false).text("Hide Office Locations")
        },
        error: () => {
          $container.html('<div class="alert alert-danger">Failed to load office locations</div>')
          $container.slideDown(300)
          $btn.prop("disabled", false).text("Show Office Locations")
        },
      })
    })
  
    // DOM Manipulation - Form validation
    function validateForm(form) {
      let isValid = true
  
      $(form)
        .find("input, textarea, select")
        .each(function () {
          const $input = $(this)
  
          if ($input.attr("required") && $input.val().trim() === "") {
            $input.addClass("is-invalid")
            isValid = false
          } else if ($input.attr("type") === "email" && $input.val().trim() !== "") {
            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test($input.val().trim())) {
              $input.addClass("is-invalid")
              isValid = false
            } else {
              $input.removeClass("is-invalid")
            }
          } else if ($input.attr("id") === "signupPassword" && $input.val().trim() !== "") {
            // Password length validation
            if ($input.val().length < 8) {
              $input.addClass("is-invalid")
              isValid = false
            } else {
              $input.removeClass("is-invalid")
            }
          } else if ($input.attr("id") === "signupConfirmPassword" && $input.val().trim() !== "") {
            // Password match validation
            if ($input.val() !== $("#signupPassword").val()) {
              $input.addClass("is-invalid")
              isValid = false
            } else {
              $input.removeClass("is-invalid")
            }
          } else {
            $input.removeClass("is-invalid")
          }
        })
  
      return isValid
    }
  
    // Remove validation styling on input
    $("input, textarea, select").on("input", function () {
      $(this).removeClass("is-invalid")
    })
  
    // Contact form submission with AJAX
    $("#contactForm").on("submit", function (e) {
      e.preventDefault()
  
      if (validateForm(this)) {
        const $form = $(this)
        const $submitBtn = $form.find('button[type="submit"]')
        const $formStatus = $("#formStatus")
  
        $submitBtn
          .prop("disabled", true)
          .html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...')
  
        // Simulate AJAX form submission
        setTimeout(() => {
          // Create form data object
          const formData = {
            name: $("#name").val(),
            email: $("#email").val(),
            subject: $("#subject").val(),
            message: $("#message").val(),
            newsletter: $("#newsletter").is(":checked"),
          }
  
          // Log form data (in a real app, this would be sent to the server)
          console.log("Form Data:", formData)
  
          // Show success message
          $formStatus.html('<div class="alert alert-success">Your message has been sent successfully!</div>').show()
          $form[0].reset()
          $submitBtn.prop("disabled", false).text("Send Message")
  
          // Hide success message after 5 seconds
          setTimeout(() => {
            $formStatus.slideUp(300)
          }, 5000)
        }, 1500)
      }
    })
  
    // User authentication state
   // let isLoggedIn = false
  
    // Function to update UI based on login state
    function updateUIForAuthState() {
      if (isLoggedIn) {
        $(".login-btn").text("Logout")
        // Show chat button only when logged in
        $("#openChatBtn").fadeIn(300)
      } else {
        $(".login-btn").text("Login")
        // Hide chat button and chat box when logged out
        $("#openChatBtn").fadeOut(300)
        $("#chatBox").fadeOut(300)
      }
    }
  
    // Initialize UI based on current auth state
    updateUIForAuthState()
  
    // Login form submission
    $("#loginForm").on("submit", function (e) {
      e.preventDefault()
  
      if (validateForm(this)) {
        // Simulate login process
        setTimeout(() => {
          isLoggedIn = true
          updateUIForAuthState()
          showNotification("Logged in successfully!")
          $("#loginModal").modal("hide")
        }, 1000)
      }
    })
  
    // Logout functionality
    $(".login-btn").on("click", (e) => {
      if (isLoggedIn) {
        // User is logged in, so log them out
        e.preventDefault() // Prevent default only when logged in
        isLoggedIn = false
        updateUIForAuthState()
        showNotification("Logged out successfully!")
      }
      // When not logged in, let the default action happen (show login modal via data-bs-toggle)
    })
  
    // Signup form submission
    $("#signupForm").on("submit", function (e) {
      e.preventDefault()
  
      if (validateForm(this)) {
        // Simulate signup process
        setTimeout(() => {
          isLoggedIn = true
          updateUIForAuthState()
          showNotification("Account created successfully!")
          $("#signupModal").modal("hide")
        }, 1000)
      }
    })
  
    // Plan selection
    $(".choose-plan").on("click", function (e) {
      e.preventDefault()
      const plan = $(this).data("plan")
  
      if (plan === "Enterprise") {
        // Redirect to contact form
        $("html, body").animate(
          {
            scrollTop: $("#contact").offset().top - 80,
          },
          800,
        )
  
        // Pre-select subject
        $("#subject").val("billing")
      } else {
        showNotification(`You've selected the ${plan} plan!`)
      }
    })
  
    // Chat functionality
    const chatBox = $("#chatBox")
    const openChatBtn = $("#openChatBtn")
    const closeChatBtn = $("#closeChatBtn")
    const chatForm = $("#chatForm")
    const chatInput = $("#chatInput")
    const chatMessages = $("#chatMessages")
    ocument.addEventListener("DOMContentLoaded", () => {
      let isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    
      const chatBox = document.getElementById("chatBox")
      const openChatBtn = document.getElementById("openChatBtn")
      const loginBtn = document.getElementById("loginBtn")
    
      function updateLoginState() {
        if (isLoggedIn) {
          loginBtn.textContent = "Logout"
          loginBtn.removeAttribute("data-bs-toggle")
          loginBtn.removeAttribute("data-bs-target")
          openChatBtn.style.display = "block"
        } else {
          loginBtn.textContent = "Login"
          loginBtn.setAttribute("data-bs-toggle", "modal")
          loginBtn.setAttribute("data-bs-target", "#loginModal")
          openChatBtn.style.display = "none"
          chatBox.style.display = "none"
        }
      }
    
      // Initialize UI based on login state
      updateLoginState()
    
      // Handle login form submission
      document.getElementById("loginForm").addEventListener("submit", function (event) {
        event.preventDefault()
        if (validateForm(this)) {
          isLoggedIn = true
          localStorage.setItem("isLoggedIn", "true")
          updateLoginState()
          showNotification("Logged in successfully!")
          $("#loginModal").modal("hide")
        }
      })
    
      // Handle login/logout button click
      loginBtn.addEventListener("click", (e) => {
        if (isLoggedIn) {
          e.preventDefault() // Prevent modal from opening when logging out
          isLoggedIn = false
          localStorage.setItem("isLoggedIn", "false")
          updateLoginState()
          showNotification("Logged out successfully!")
        }
      })
    
      // Chatbox open/close functionality
      openChatBtn.addEventListener("click", () => {
        chatBox.style.display = "flex"
        openChatBtn.style.display = "none"
      })
    
      document.getElementById("closeChatBtn").addEventListener("click", () => {
        chatBox.style.display = "none"
        openChatBtn.style.display = isLoggedIn ? "block" : "none"
      })
    })
    function hideFeatures() {
      const hiddenFeatures = document.querySelectorAll(".hidden-feature")
      hiddenFeatures.forEach((feature) => {
        feature.style.display = "none"
      })
    }
    
    hideFeatures()
    
    // Keep the original login button event listener for backward compatibility
    let isLoggedIn = localStorage.getItem("isLoggedIn") === "true" // Declare isLoggedIn
    const $ = jQuery // Declare $
    document.querySelector(".login-btn").addEventListener("click", function () {
      if (this.textContent === "Logout") {
        this.textContent = "Login"
        isLoggedIn = false
        localStorage.setItem("isLoggedIn", "false")
        updateChatVisibility()
        hideFeatures()
        showNotification("Logged out successfully!")
      }
    })
    
    // Function to update chat visibility (for backward compatibility)
    function updateChatVisibility() {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
      const chatBox = document.getElementById("chatBox")
      const openChatBtn = document.getElementById("openChatBtn")
    
      if (isLoggedIn) {
        openChatBtn.style.display = "block"
      } else {
        openChatBtn.style.display = "none"
        chatBox.style.display = "none"
      }
    }
    // Hide chat button initially (will be shown based on login state)
    openChatBtn.hide()
  
    openChatBtn.on("click", () => {
      if (isLoggedIn) {
        chatBox.fadeIn(300)
        openChatBtn.fadeOut(300)
  
        // Add welcome message if chat is empty
        if (chatMessages.children().length === 0) {
          addMessage("Support", "Hello! How can I help you today?")
        }
      } else {
        // If somehow the button is clicked while logged out, show login modal
        $("#loginModal").modal("show")
      }
    })
  
    closeChatBtn.on("click", () => {
      chatBox.fadeOut(300)
      if (isLoggedIn) {
        openChatBtn.fadeIn(300)
      }
    })
  
    chatForm.on("submit", (e) => {
      e.preventDefault()
  
      const message = chatInput.val().trim()
      if (message !== "") {
        addMessage("You", message, "user-message")
        chatInput.val("")
  
        // Simulate response after a short delay
        setTimeout(() => {
          let response
  
          // Simple keyword-based responses
          if (message.toLowerCase().includes("pricing") || message.toLowerCase().includes("cost")) {
            response =
              "Our pricing plans start at $9.99/month for the Basic plan. You can view all our plans in the Pricing section."
          } else if (message.toLowerCase().includes("feature") || message.toLowerCase().includes("functionality")) {
            response =
              "Momentum offers task organization, team collaboration, progress tracking, and many more features. Check out our Features section for more details."
          } else if (message.toLowerCase().includes("contact") || message.toLowerCase().includes("support")) {
            response =
              "You can reach our support team at info@momentum.com or by filling out the contact form on our website."
          } else if (message.toLowerCase().includes("hello") || message.toLowerCase().includes("hi")) {
            response = "Hello! How can I assist you with Momentum today?"
          } else {
            response =
              "Thank you for your message. Our team will get back to you soon. Is there anything else I can help you with?"
          }
  
          addMessage("Support", response, "support-message")
        }, 1000)
      }
    })
  
    function addMessage(sender, message, className = "") {
      const messageElement = $("<div>").addClass("chat-message " + className)
      messageElement.html(`${message}`)
      chatMessages.append(messageElement)
      chatMessages.scrollTop(chatMessages[0].scrollHeight)
    }
  
    // Notification function
    function showNotification(message, type = "success") {
      const notification = $("#notification")
      notification.text(message)
      notification.removeClass("error")
  
      if (type === "error") {
        notification.addClass("error")
      }
  
      notification.addClass("show")
  
      setTimeout(() => {
        notification.removeClass("show")
      }, 3000)
    }
  
    // Dark mode toggle
    $("#darkModeSwitch").on("change", function () {
      if ($(this).is(":checked")) {
        $("body").addClass("dark-mode")
        localStorage.setItem("darkMode", "enabled")
      } else {
        $("body").removeClass("dark-mode")
        localStorage.setItem("darkMode", "disabled")
      }
    })
  
    // Check for saved dark mode preference
    if (localStorage.getItem("darkMode") === "enabled") {
      $("body").addClass("dark-mode")
      $("#darkModeSwitch").prop("checked", true)
    }
  })
  
  // DOM Content Loaded event listener (vanilla JavaScript)
  document.addEventListener("DOMContentLoaded", () => {
    // Add animation to elements when they come into view
    const animateOnScroll = () => {
      const elements = document.querySelectorAll(".card, .pricing-card, h2")
  
      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top
        const windowHeight = window.innerHeight
  
        if (elementPosition < windowHeight - 50) {
          element.classList.add("fade-in")
        }
      })
    }
  
    // Run on initial load
    animateOnScroll()
  
    // Run on scroll
    window.addEventListener("scroll", animateOnScroll)
  })
  
  