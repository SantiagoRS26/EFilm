using Models;

namespace EFilm.Controllers
{
    using System.Security.Claims;
    using Business_Logic_Layer.Interfaces;
    using Business_Logic_Layer.Services;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentService commentService;

        public CommentController(ICommentService commentService)
        {
            this.commentService = commentService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCommentById(string id)
        {
            var comment = await this.commentService.GetCommentByIdAsync(id);
            if (comment == null)
            {
                return this.NotFound();
            }

            return this.Ok(comment);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateComment([FromBody] Comment newComment)
        {
            if (!this.ModelState.IsValid)
            {
                return this.BadRequest(this.ModelState);
            }

            var userId = this.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var createdComment = await this.commentService.CreateCommentAsync(newComment, userId);
            return this.CreatedAtAction(nameof(this.GetCommentById), new { id = createdComment.CommentId }, createdComment);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateComment(string id, [FromBody] Comment updatedComment)
        {
            if (id != updatedComment.CommentId)
            {
                return this.BadRequest("Comment ID mismatch");
            }

            if (!this.ModelState.IsValid)
            {
                return this.BadRequest(this.ModelState);
            }

            var userId = this.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var updatedCommentResult = await this.commentService.UpdateCommentAsync(updatedComment, userId);

            if (updatedCommentResult == null)
            {
                return this.NotFound("Comment not found or user not authorized");
            }

            return this.Ok(updatedCommentResult);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteComment(string id)
        {
            var userId = this.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var result = await this.commentService.DeleteCommentAsync(id, userId);

            if (!result)
            {
                return this.NotFound("Comment not found or user not authorized");
            }

            return this.NoContent();
        }

        [HttpGet("movie/{movieId}")]
        public async Task<IActionResult> GetCommentsByMovieId(string movieId)
        {
            var comments = await this.commentService.GetCommentsByMovieIdAsync(movieId);
            return this.Ok(comments);
        }
    }
}
