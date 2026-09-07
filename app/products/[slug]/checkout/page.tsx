import { notFound } from "next/navigation";
import CheckoutForm from "../../../../components/CheckoutForm";
import { getProduct } from "../../../../lib/products";

export default async function CheckoutPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return notFound();

  return (
    <div style={{ padding: "48px 20px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 420px", gap: 36, alignItems: "start" }}>
        <div>
          <h1 style={{ fontSize: 32, marginBottom: 6 }}>{product.title}</h1>
          <p style={{ color: "var(--tx2)", marginBottom: 18 }}>Secure checkout — no account required. Choose your payment method and get instant access.</p>

          <div style={{ border: "1px solid var(--bd)", borderRadius: 12, padding: 18, background: "var(--bg2)" }}>
            <h3 style={{ marginBottom: 8 }}>What you get</h3>
            <ul style={{ marginLeft: 18 }}>
              {product.includes?.map((i) => (
                <li key={i.label} style={{ marginBottom: 6 }}>{i.icon} {i.label}</li>
              ))}
            </ul>
          </div>
        </div>

        <aside style={{ position: "sticky", top: 90 }}>
          <div style={{ border: "1px solid var(--bd)", padding: 20, borderRadius: 12, background: "var(--bg2)" }}>
            <div style={{ fontSize: 12, color: "var(--ac)", fontWeight: 800, marginBottom: 6 }}>{product.discount}</div>
            <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 12 }}>{product.price}</div>
            <CheckoutForm productSlug={product.slug} productTitle={product.title} price={product.price} />
          </div>
        </aside>
      </div>
    </div>
  );
}
