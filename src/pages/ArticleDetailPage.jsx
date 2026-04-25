import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar } from "lucide-react";
import api from "@/lib/api";

export default function ArticleDetailPage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const data = await api.getArticle(id);
        setArticle(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-zinc-500">
        Загрузка...
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center text-zinc-500">
        Статья не найдена
      </div>
    );
  }

  const paragraphs = article.content
    ? article.content.split("\n").filter((p) => p.trim() !== "")
    : [];

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-3xl mx-auto min-w-0">
        {/* Назад */}
        <Link
          to="/articles"
          className="inline-flex items-center gap-2 text-sm text-brand-gold hover:text-brand-gold-hover mb-6"
        >
          <ArrowLeft size={16} />
          Назад к статьям
        </Link>

        {/* Дата */}
        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-3">
          <Calendar size={14} />
          {new Date(article.created_at).toLocaleDateString("ru-RU")}
        </div>

        {/* Заголовок */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6 break-words">
          {article.title}
        </h1>

        {/* Изображение */}
        {article.image_url && (
          <div className="mb-8">
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
        )}

        {/* Контент */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="min-w-0 overflow-hidden"
        >
          <div
            className="
              prose-dark
              max-w-none
              break-words
              [overflow-wrap:anywhere]
            "
            data-testid="article-detail-content"
          >
            {paragraphs.map((p, i) => {
              if (p.startsWith("- ") || p.startsWith("• ")) {
                return (
                  <ul key={i} className="list-disc pl-6 mb-4">
                    <li className="break-words [overflow-wrap:anywhere]">
                      {p.replace(/^[-•]\s*/, "")}
                    </li>
                  </ul>
                );
              }

              return (
                <p
                  key={i}
                  className="mb-5 leading-8 text-zinc-300 break-words [overflow-wrap:anywhere]"
                >
                  {p}
                </p>
              );
            })}
          </div>
        </motion.article>

        {/* Кнопка вниз */}
        <div className="mt-12 border-t border-zinc-800 pt-6">
          <Link
            to="/articles"
            className="text-sm text-brand-gold hover:text-brand-gold-hover"
          >
            ← Все статьи
          </Link>
        </div>
      </div>
    </div>
  );
}
