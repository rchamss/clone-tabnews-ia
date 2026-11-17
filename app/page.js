import { Suspense } from "react";
import { prefetchDNS } from "react-dom";

export const dynamic = "force-dynamic";

const TABNEWS_CONTENTS_API =
  "https://www.tabnews.com.br/api/v1/contents?strategy=new&page=1&per_page=1";
const TABNEWS_URL = "https://www.tabnews.com.br";
const PT_BR_NUMBER_FORMAT = new Intl.NumberFormat("pt-BR");

let inFlightPublicationsPromise = null;

const COMPUTE_BACKGROUND = (
  <div className="compute-bg" aria-hidden="true">
    <div className="compute-orb orb-blue" />
    <div className="compute-orb orb-green" />
    <div className="compute-orb orb-yellow" />
    <div className="compute-orb orb-red" />
    <div className="compute-grid" />
    <div className="compute-sweep" />
  </div>
);

const STAT_SKELETON = (
  <div
    className="stat-value-row"
    aria-label="Consultando total de publicações no TabNews"
  >
    <span className="stat-skeleton" />
  </div>
);

const STAT_FALLBACK = (
  <div className="stat-value-row">
    <span className="stat-fallback">
      Não foi possível consultar a API agora.
    </span>
  </div>
);

const EXTERNAL_LINK_ICON = (
  <svg
    className="button-icon"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

async function fetchTotalTabNewsPublications() {
  try {
    const response = await fetch(TABNEWS_CONTENTS_API, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
      headers: {
        Accept: "application/json",
      },
    });

    const totalHeader = response.headers.get("x-pagination-total-rows");
    await response.body?.cancel();

    if (!response.ok || totalHeader === null) {
      return null;
    }

    const total = Number.parseInt(totalHeader, 10);
    return Number.isFinite(total) && total >= 0 ? total : null;
  } catch {
    return null;
  }
}

/**
 * Consults the official TabNews API on every request to obtain the current
 * total count of published root posts from `x-pagination-total-rows`.
 * Coalesces concurrent in-flight requests to avoid redundant upstream calls.
 */
function getTotalTabNewsPublications() {
  if (!inFlightPublicationsPromise) {
    inFlightPublicationsPromise = fetchTotalTabNewsPublications().finally(
      () => {
        inFlightPublicationsPromise = null;
      }
    );
  }

  return inFlightPublicationsPromise;
}

async function TabNewsPublicationsStat() {
  const total = await getTotalTabNewsPublications();

  if (total === null) {
    return STAT_FALLBACK;
  }

  return (
    <div className="stat-value-row">
      <strong className="stat-number">
        {PT_BR_NUMBER_FORMAT.format(total)}
      </strong>
      <span className="stat-unit">publicações</span>
    </div>
  );
}

export default function Home() {
  prefetchDNS(TABNEWS_URL);

  return (
    <>
      {COMPUTE_BACKGROUND}

      <main className="page-shell">
        <section className="status-card" aria-labelledby="page-title">
          <div className="status-badge">
            <span className="status-pulse" aria-hidden="true" />
            <span>Processamento ativo · Em desenvolvimento</span>
          </div>

          <h1 id="page-title" className="hero-title">
            Em Construção<span className="title-dots">...</span>
          </h1>

          <p className="hero-description">
            Ainda estamos construindo este site com novos recursos e
            experiências. Enquanto finalizamos tudo por aqui, acompanhe em tempo
            real o total de publicações feitas no TabNews oficial.
          </p>

          <div className="stat-panel">
            <div className="stat-header">
              <span className="stat-label">Publicações no TabNews oficial</span>
              <span className="stat-live-tag">API oficial · ao vivo</span>
            </div>

            <Suspense fallback={STAT_SKELETON}>
              <TabNewsPublicationsStat />
            </Suspense>
          </div>

          <div className="cta-wrapper">
            <a
              className="tabnews-button"
              href={TABNEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Acessar o TabNews oficial</span>
              {EXTERNAL_LINK_ICON}
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
