"use client"
import { useSearchParams } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import SearchBar from "@/components/search/SearchBar"
import ResultsContainer from "@/components/results/ResultsContainer"
import Spinner from "@/components/ui/Spinner"
import ErrorCard from "@/components/ui/ErrorCard"
import EmptyState from "@/components/ui/EmptyState"
import { searchAll, SearchResponse } from "@/lib/api"
import { useLanguage } from "@/context/LanguageContext"

function SearchContent() {
  const searchParams = useSearchParams()
  const from = searchParams.get("from") || ""
  const to = searchParams.get("to") || ""
  const date = searchParams.get("date") || ""

  const [results, setResults] = useState<SearchResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (from && to) {
      setLoading(true)
      setError(null)
      searchAll(from, to, date)
        .then(setResults)
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false))
    }
  }, [from, to, date])

  const { t } = useLanguage()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-surface-900 mb-2">{t("nav_search")}</h1>
        <p className="text-surface-500">{t("hero_subtitle")}</p>
      </div>

      <div className="mb-8">
        <SearchBar />
      </div>

      {loading && (
        <div className="py-20">
          <Spinner size="lg" />
          <p className="text-center text-surface-500 mt-4">Searching across all providers...</p>
        </div>
      )}

      {error && (
        <ErrorCard message={error} onRetry={() => window.location.reload()} />
      )}

      {results && !loading && (
        <ResultsContainer data={results} />
      )}

      {!results && !loading && !error && from === "" && (
        <EmptyState
          title="Search for your next trip"
          description="Enter your departure and destination cities above to find trains, buses, and hotels."
          icon="🔍"
        />
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="py-20"><Spinner size="lg" /></div>}>
      <SearchContent />
    </Suspense>
  )
}
