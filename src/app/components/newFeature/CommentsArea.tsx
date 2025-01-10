import React from "react";

const CommentsArea: React.FC = () => {
  return (
    <div id="comments" className="comments-area">
      <h2 className="comments-title">
        <i className="fas fa-user-circle"></i> (1) Comentário
      </h2>
      <ul className="post-comments">
        <li className="comment even thread-even depth-1" id="comment-1429">
          <div className="comment-avatar">
            <img
              alt=""
              src="https://q1n.net/wp-content/litespeed/avatar/8286c560003ef2629bc0a63c4ad73501.jpg?ver=1736305847"
              srcSet="https://q1n.net/wp-content/litespeed/avatar/9ae252e04af5b347bf633e6fecc7b909.jpg?ver=1736305847 2x"
              className="avatar avatar-60 photo"
              height="60"
              width="60"
              decoding="async"
            />
          </div>
          <div className="scontent">
            <div id="comment-inner-1429">
              <div className="comment-header">
                MAOU SAMA KUNARI
                <span className="comment-time">9 de janeiro de 2025</span>
                <a
                  rel="nofollow"
                  className="comment-reply-link"
                  href="#comment-1429"
                  data-commentid="1429"
                  data-postid="76170"
                  data-belowelement="comment-inner-1429"
                  data-respondelement="respond"
                  data-replyto="Responder para MAOU SAMA KUNARI"
                  aria-label="Responder para MAOU SAMA KUNARI"
                >
                  Responder
                </a>
              </div>
              <p>a obsessão levou o cara a ser traidor, super arrombado, vlw adm</p>
            </div>
          </div>
        </li>
      </ul>
      <div id="respond" className="comment-respond">
        <h3 id="reply-title" className="comment-reply-title">
          Deixe um comentário{" "}
          <small>
            <a
              rel="nofollow"
              id="cancel-comment-reply-link"
              href="/e/rurouni-kenshin-meiji-kenkaku-romantan-kyoto-douran-episodio-13/#respond"
              style={{ display: "none" }}
            >
              Cancelar resposta
            </a>
          </small>
        </h3>
        <form
          action="https://q1n.net/wp-comments-post.php"
          method="post"
          id="commentform"
          className="comment-form"
        >
          <div className="comment-form-comment">
            <textarea
              id="comment"
              name="comment"
              required
              className="normal"
              placeholder="Seu comentário..."
            ></textarea>
          </div>
          <div className="grid-container">
            <div className="grid desk-8 alpha">
              <div className="form-label">
                Nome <em className="text-red" title="Obrigatório">*</em>
              </div>
              <div className="form-description">Adicionar um nome de exibição</div>
              <input
                name="author"
                type="text"
                className="fullwidth"
                required
              />
            </div>
          </div>
          <div className="grid-container fix-grid">
            <div className="grid desk-8 alpha">
              <div className="form-label">
                Email <em className="text-red" title="Obrigatório">*</em>
              </div>
              <div className="form-description">
                Seu endereço de e-mail não será publicado, você pode usar qualquer e-mail falso!
              </div>
              <input
                name="email"
                type="text"
                className="fullwidth"
                required
              />
            </div>
          </div>
          <p className="form-submit">
            <input
              name="submit"
              type="submit"
              id="submit"
              className="submit"
              value="Postar comentário"
            />
            <input type="hidden" name="comment_post_ID" value="76170" />
            <input type="hidden" name="comment_parent" value="0" />
          </p>
        </form>
      </div>
    </div>
  );
};

export default CommentsArea;
