import { getProductReviewCounts } from "@/lib/firebase/products/count/read";
import { Rating } from "@mui/material";

export async function RatingReview({ product }: any) {
  const counts = await getProductReviewCounts({ productId: product?.id });
  return (
    <div className="flex gap-3 items-center">
      <Rating
        name="product-rating"
        defaultValue={counts?.averageRating ?? 5}
        precision={0.5}
        readOnly
      />
      <h1 className="text-xs text-gray-400">
        <span>{counts?.averageRating?.toFixed(1)}</span> ({counts?.totalReviews}
        )
      </h1>
    </div>
  );
}
