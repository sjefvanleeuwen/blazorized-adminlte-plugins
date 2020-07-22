using Microsoft.AspNetCore.Components;
using System;
using System.ComponentModel;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;

namespace Blazorized.AdminLte.Plugins.Shared.Pages { 
    public partial class Default
    {
        [Inject] HttpClient Http { get; set; }

        private PersonData[] data;

        protected override async Task OnInitializedAsync()
        {
            data = await Http.GetFromJsonAsync<PersonData[]>("sample-data/mock-data.json");
        }
        protected override void OnAfterRender(bool firstRender)
        {
            //HttpClient.
            base.OnAfterRender(firstRender);
        }

        public class PersonData
        {
            public int? id { get; set; }
            public string full_name { get; set; }
            public string email { get; set; }
            public bool? paid { get; set; }
            public decimal? price { get; set; }
            public CreditCard? cc_type { get; set; }
            public DateTime? created_date { get; set; }

            /// <summary>
            /// Returns row CSS if price over 800
            /// </summary>
            public string RowClass => price.GetValueOrDefault(0) > 800 ? "table-danger" : null;
        }

        public enum CreditCard
        {
            none = 0,
            [Description("MasterCard")]
            MasterCard = 1,
            Visa = 2
        }
    }
}
